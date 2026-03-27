#!/bin/bash

# SSL Setup Script - Upgrade from HTTP to HTTPS
# This script enables HTTPS on your existing HTTP deployment

set -e

echo "🔒 SSL Setup: Upgrading from HTTP to HTTPS..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null; then
    print_error "docker-compose not found!"
    exit 1
fi

# Check if services are running
if ! docker-compose ps | grep -q "Up"; then
    print_error "Services are not running. Please start them first with: docker-compose up -d"
    exit 1
fi

print_status "Current status: HTTP-only deployment detected"
print_status "Starting HTTPS upgrade process..."

# Backup current nginx config
print_status "Backing up current nginx configuration..."
cp nginx.conf nginx-http-backup.conf
print_success "Backup saved as nginx-http-backup.conf"

print_status "Checking SSL prerequisites..."

# Check DNS and HTTP connectivity
ssl_ready=true
domains=("admin.azmarif.dev" "client.azmarif.dev" "server.azmarif.dev")
expected_ip="103.213.38.213"

for domain in "${domains[@]}"; do
    # Check DNS
    resolved_ip=$(dig +short $domain 2>/dev/null | head -1 || nslookup $domain 2>/dev/null | grep -A1 "Name:" | grep "Address:" | awk '{print $2}' | head -1 || echo "")
    
    if [ "$resolved_ip" = "$expected_ip" ]; then
        print_success "✓ DNS: $domain → $resolved_ip"
    else
        print_error "❌ DNS: $domain → $resolved_ip (expected: $expected_ip)"
        ssl_ready=false
    fi
    
    # Check HTTP connectivity (should be working since we're upgrading from HTTP)
    http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://$domain/health" || echo "000")
    if [ "$http_code" = "200" ]; then
        print_success "✓ HTTP: $domain is reachable (code: $http_code)"
    else
        print_error "❌ HTTP: $domain not reachable (code: $http_code)"
        print_error "Your HTTP deployment seems to have issues. Please fix HTTP first."
        ssl_ready=false
    fi
    
    # Check ACME challenge path
    acme_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://$domain/.well-known/acme-challenge/" || echo "000")
    if [ "$acme_code" = "404" ] || [ "$acme_code" = "403" ]; then
        print_success "✓ ACME: $domain challenge path accessible"
    else
        print_warning "⚠ ACME: $domain challenge path (code: $acme_code)"
    fi
done

if [ "$ssl_ready" = false ]; then
    print_error "SSL prerequisites not met. Please fix the above issues first."
    echo ""
    print_status "Common fixes:"
    echo "  1. Ensure HTTP deployment is working: curl http://admin.azmarif.dev/health"
    echo "  2. Check DNS: dig admin.azmarif.dev"
    echo "  3. Check firewall: ufw status"
    echo "  4. Wait for DNS propagation (up to 24 hours)"
    echo "  5. Verify services: docker-compose ps"
    exit 1
fi

print_success "All prerequisites met. Ready for HTTPS upgrade!"

# Backup current nginx configuration
print_status "Creating backup of current HTTP configuration..."
backup_dir="nginx-backup-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$backup_dir"
cp nginx.conf "$backup_dir/nginx.conf.http"
print_success "✓ Backup created: $backup_dir/nginx.conf.http"

# Check existing certificates
print_status "Checking for existing certificates..."
existing_certs=false

for domain in "${domains[@]}"; do
    if [ -f "certbot/conf/live/$domain/fullchain.pem" ]; then
        print_warning "Certificate for $domain already exists"
        existing_certs=true
    fi
done

if [ "$existing_certs" = true ]; then
    echo ""
    read -p "Existing certificates found. Do you want to renew them? (y/N): " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        print_status "Exiting without changes."
        exit 0
    fi
fi

# Test with dry-run first
print_status "Testing SSL setup with dry-run..."
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@azmarif.dev \
    --agree-tos \
    --no-eff-email \
    --dry-run \
    -d admin.azmarif.dev \
    -d client.azmarif.dev \
    -d server.azmarif.dev

if [ $? -ne 0 ]; then
    print_error "SSL dry-run failed! Check the errors above."
    exit 1
fi

print_success "Dry-run successful! Getting production certificates..."

# Get production certificates
docker-compose run --rm certbot certonly \
    --webroot \
    --webroot-path=/var/www/certbot \
    --email admin@azmarif.dev \
    --agree-tos \
    --no-eff-email \
    $([ "$existing_certs" = true ] && echo "--force-renewal" || echo "") \
    -d admin.azmarif.dev \
    -d client.azmarif.dev \
    -d server.azmarif.dev

if [ $? -eq 0 ]; then
    print_success "SSL certificates obtained successfully!"
    
    # Create HTTPS-enabled nginx configuration
    print_status "Updating nginx configuration for HTTPS..."
    
    cat > nginx.conf << 'EOF'
# Main nginx configuration
worker_processes auto;
error_log /var/log/nginx/error.log warn;
pid /var/run/nginx.pid;

events {
    worker_connections 1024;
    use epoll;
    multi_accept on;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    # Logging
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log /var/log/nginx/access.log main;

    # Basic settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    client_max_body_size 100M;

    # Rate limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=general:10m rate=5r/s;

    # WebSocket connection upgrade mapping
    map $http_upgrade $connection_upgrade {
        default upgrade;
        ''      close;
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Upstream definitions
    upstream admin_backend {
        server zyslet-admin:3000 max_fails=3 fail_timeout=30s;
    }

    upstream client_backend {
        server zyslet-client:4000 max_fails=3 fail_timeout=30s;
    }

    upstream api_backend {
        server zyslet-backend:5000 max_fails=3 fail_timeout=30s;
    }

    # HTTP redirect to HTTPS
    server {
        listen 80;
        server_name admin.azmarif.dev client.azmarif.dev server.azmarif.dev;
        
        # Allow ACME challenge for certificate renewal
        location /.well-known/acme-challenge/ {
            root /var/www/certbot;
        }
        
        # Redirect all other traffic to HTTPS
        location / {
            return 301 https://$server_name$request_uri;
        }
    }

    # Admin Panel - HTTPS
    server {
        listen 443 ssl http2;
        server_name admin.azmarif.dev;

        # SSL configuration
        ssl_certificate /etc/letsencrypt/live/admin.azmarif.dev/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/admin.azmarif.dev/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/admin.azmarif.dev/chain.pem;

        # SSL settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # HSTS
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Rate limiting
        limit_req zone=general burst=20 nodelay;

        # Health check
        location /health {
            return 200 "OK";
            add_header Content-Type text/plain;
        }

        # Security: Block access to hidden files and dangerous executables
        location ~ /\. {
            deny all;
        }

        location ~* \.(bak|backup|old|orig|save|swp|tmp|temp|~)$ {
            deny all;
            return 404;
        }

        location ~* \.(php|jsp|cgi|asp|aspx|pl|py|sh|lua|bat|exe|dll)$ {
            deny all;
            return 403;
        }

        location / {
            proxy_pass http://admin_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_redirect off;
            
            # Timeouts
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
    }

    # Client App - HTTPS
    server {
        listen 443 ssl http2;
        server_name client.azmarif.dev;

        # SSL configuration
        ssl_certificate /etc/letsencrypt/live/client.azmarif.dev/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/client.azmarif.dev/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/client.azmarif.dev/chain.pem;

        # SSL settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # HSTS
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Rate limiting
        limit_req zone=general burst=20 nodelay;

        # Health check
        location /health {
            return 200 "OK";
            add_header Content-Type text/plain;
        }

        # Security: Block access to hidden files and dangerous executables
        location ~ /\. {
            deny all;
        }

        location ~* \.(bak|backup|old|orig|save|swp|tmp|temp|~)$ {
            deny all;
            return 404;
        }

        location ~* \.(php|jsp|cgi|asp|aspx|pl|py|sh|lua|bat|exe|dll)$ {
            deny all;
            return 403;
        }

        location / {
            proxy_pass http://client_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_redirect off;
            
            # Timeouts
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
    }

    # API Server - HTTPS
    server {
        listen 443 ssl http2;
        server_name server.azmarif.dev;

        # SSL configuration
        ssl_certificate /etc/letsencrypt/live/server.azmarif.dev/fullchain.pem;
        ssl_certificate_key /etc/letsencrypt/live/server.azmarif.dev/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/server.azmarif.dev/chain.pem;

        # SSL settings
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-SHA256:ECDHE-RSA-AES256-SHA384;
        ssl_prefer_server_ciphers off;
        ssl_session_cache shared:SSL:10m;
        ssl_session_timeout 10m;

        # HSTS
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;

        # Rate limiting for API
        limit_req zone=api burst=30 nodelay;

        # Health check
        location /health {
            return 200 "OK";
            add_header Content-Type text/plain;
        }

        # File serving for uploads
        location /server-tmp/ {
            alias /var/www/uploads/;
            expires 1y;
            add_header Cache-Control "public, immutable";
            add_header Access-Control-Allow-Origin "*";
            
            # Security for file serving - prevent execution of dangerous files
            location ~* \.(php|jsp|cgi|asp|aspx|pl|py|sh|lua|bat|exe|dll)$ {
                deny all;
                return 403;
            }
        }

        # Security: Block access to hidden files and directories
        location ~ /\. {
            deny all;
        }

        # Security: Block access to backup and config files
        location ~* \.(bak|backup|old|orig|save|swp|tmp|temp|~)$ {
            deny all;
            return 404;
        }

        # Security: Block access to dangerous executable files
        location ~* \.(php|jsp|cgi|asp|aspx|pl|py|sh|lua|bat|exe|dll)$ {
            deny all;
            return 403;
        }

        location / {
            proxy_pass http://api_backend;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection $connection_upgrade;
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_cache_bypass $http_upgrade;
            proxy_redirect off;
            
            # Timeouts
            proxy_connect_timeout 60s;
            proxy_send_timeout 60s;
            proxy_read_timeout 60s;
        }
    }
}
EOF

    print_success "✓ HTTPS nginx configuration created"
    
    # Restart nginx to use new certificates
    print_status "Restarting nginx with SSL..."
    docker-compose restart nginx
    
    if [ $? -eq 0 ]; then
        print_success "Nginx restarted successfully!"
        
        # Test HTTPS connectivity
        print_status "Testing HTTPS connectivity..."
        sleep 10
        
        for domain in "${domains[@]}"; do
            https_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://$domain/health" || echo "000")
            if [ "$https_code" = "200" ]; then
                print_success "✅ HTTPS working: $domain"
            else
                print_error "❌ HTTPS failed: $domain (code: $https_code)"
            fi
            
            # Test HTTP redirect
            redirect_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -I "http://$domain" || echo "000")
            if [ "$redirect_code" = "301" ] || [ "$redirect_code" = "302" ]; then
                print_success "✅ HTTP→HTTPS redirect: $domain"
            else
                print_warning "⚠ HTTP→HTTPS redirect may not be working: $domain"
            fi
        done
        
        echo ""
        print_success "🎉 SSL setup completed successfully!"
        echo ""
        print_success "Your sites are now available via HTTPS:"
        echo -e "  🖥️  Admin Panel: ${GREEN}https://admin.azmarif.dev${NC}"
        echo -e "  📱 Client App:  ${GREEN}https://client.azmarif.dev${NC}"
        echo -e "  🚀 API Server:  ${GREEN}https://server.azmarif.dev${NC}"
        echo ""
        print_status "SSL certificate renewal is automated. Check ssl-renew.sh for manual renewal."
        echo ""
        print_status "To rollback to HTTP-only (if needed):"
        echo "  1. cp $backup_dir/nginx.conf.http nginx.conf"
        echo "  2. docker-compose restart nginx"
        
    else
        print_error "Failed to restart nginx with SSL config"
        print_status "Rolling back to HTTP configuration..."
        cp "$backup_dir/nginx.conf.http" nginx.conf
        docker-compose restart nginx
        print_error "Rolled back to HTTP. Check nginx logs: docker-compose logs nginx"
        exit 1
    fi
else
    print_error "Failed to obtain SSL certificates"
    print_status "Your HTTP deployment is still running normally."
    exit 1
fi
