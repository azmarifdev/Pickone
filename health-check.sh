#!/bin/bash

# Health Check Script for Zyslet Application
# Checks the status of all services and endpoints

echo "🏥 Zyslet Health Check Started..."

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# Check docker containers
print_status "Checking Docker containers..."
if command -v docker-compose &> /dev/null; then
    if docker-compose ps | grep -q "Up"; then
        containers=$(docker-compose ps --services --filter "status=running")
        for container in $containers; do
            print_success "✅ $container is running"
        done
        
        # Check for any stopped containers
        stopped=$(docker-compose ps --services --filter "status=exited")
        if [ -n "$stopped" ]; then
            for container in $stopped; do
                print_error "❌ $container is stopped"
            done
        fi
    else
        print_error "No containers are running"
        exit 1
    fi
else
    print_error "docker-compose not found"
    exit 1
fi

echo ""

# Check HTTP/HTTPS endpoints
print_status "Checking HTTP endpoints..."
domains=("admin.azmarif.dev" "client.azmarif.dev" "server.azmarif.dev")

for domain in "${domains[@]}"; do
    # Check HTTP (should redirect to HTTPS)
    http_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://$domain/health" || echo "000")
    if [ "$http_code" = "301" ] || [ "$http_code" = "302" ]; then
        print_success "✅ HTTP→HTTPS redirect working for $domain"
    elif [ "$http_code" = "200" ]; then
        print_warning "⚠️ $domain responding via HTTP (SSL may not be configured)"
    else
        print_error "❌ $domain not responding via HTTP (code: $http_code)"
    fi
    
    # Check HTTPS
    https_code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://$domain/health" || echo "000")
    if [ "$https_code" = "200" ]; then
        print_success "✅ HTTPS working for $domain"
    else
        print_error "❌ HTTPS not working for $domain (code: $https_code)"
    fi
done

echo ""

# Check SSL certificates
print_status "Checking SSL certificates..."
for domain in "${domains[@]}"; do
    if [ -f "certbot/conf/live/$domain/fullchain.pem" ]; then
        # Check certificate expiry
        expiry=$(openssl x509 -enddate -noout -in "certbot/conf/live/$domain/fullchain.pem" 2>/dev/null | cut -d= -f2 || echo "Unknown")
        if [ "$expiry" != "Unknown" ]; then
            print_success "✅ SSL certificate for $domain expires: $expiry"
        else
            print_warning "⚠️ Could not read certificate expiry for $domain"
        fi
    else
        print_error "❌ SSL certificate not found for $domain"
    fi
done

echo ""

# Check specific application endpoints
print_status "Checking application-specific endpoints..."

# Admin panel
admin_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://admin.azmarif.dev" || echo "000")
if [ "$admin_status" = "200" ]; then
    print_success "✅ Admin panel is accessible"
else
    print_error "❌ Admin panel not accessible (code: $admin_status)"
fi

# Client app
client_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://client.azmarif.dev" || echo "000")
if [ "$client_status" = "200" ]; then
    print_success "✅ Client app is accessible"
else
    print_error "❌ Client app not accessible (code: $client_status)"
fi

# API server
api_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://server.azmarif.dev/api/health" || echo "000")
if [ "$api_status" = "200" ]; then
    print_success "✅ API server is accessible"
else
    # Try alternative health endpoint
    api_status2=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://server.azmarif.dev" || echo "000")
    if [ "$api_status2" = "200" ]; then
        print_success "✅ API server is accessible"
    else
        print_error "❌ API server not accessible (codes: $api_status, $api_status2)"
    fi
fi

echo ""

# Check file upload directory
print_status "Checking file upload setup..."
if [ -d "uploads" ]; then
    if [ -w "uploads" ]; then
        print_success "✅ Uploads directory exists and is writable"
    else
        print_warning "⚠️ Uploads directory exists but may not be writable"
    fi
else
    print_error "❌ Uploads directory not found"
fi

# Test file serving
file_status=$(curl -s -o /dev/null -w "%{http_code}" --max-time 10 -k "https://server.azmarif.dev/server-tmp/" || echo "000")
if [ "$file_status" = "200" ] || [ "$file_status" = "403" ] || [ "$file_status" = "404" ]; then
    print_success "✅ File serving endpoint is configured"
else
    print_error "❌ File serving endpoint not working (code: $file_status)"
fi

echo ""
print_status "🏁 Health check completed!"

# Summary
echo -e "\n📊 ${BLUE}Quick Access Links:${NC}"
echo -e "  🖥️  Admin Panel: ${GREEN}https://admin.azmarif.dev${NC}"
echo -e "  📱 Client App:  ${GREEN}https://client.azmarif.dev${NC}"
echo -e "  🚀 API Server:  ${GREEN}https://server.azmarif.dev${NC}"
echo -e "\n📋 ${BLUE}Useful Commands:${NC}"
echo -e "  📊 View logs:    ${YELLOW}docker-compose logs -f [service]${NC}"
echo -e "  🔄 Restart:      ${YELLOW}docker-compose restart [service]${NC}"
echo -e "  🛑 Stop all:     ${YELLOW}docker-compose down${NC}"
echo -e "  🔄 SSL renewal:  ${YELLOW}./ssl-renew.sh${NC}"
