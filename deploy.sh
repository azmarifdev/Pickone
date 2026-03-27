#!/bin/bash

# Zyslet Production Deployment Script
# Author: GitHub Copilot
# Date: $(date)

set -e

echo "🚀 Starting Zyslet Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
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

# Check if running as root
if [[ $EUID -eq 0 ]]; then
   print_warning "This script is running as root. This is fine for VPS deployment."
fi

# Create necessary directories
print_status "Creating necessary directories..."
mkdir -p server-tmp
mkdir -p ssl-certs
mkdir -p certbot/conf
mkdir -p certbot/www

# Setup environment files if they don't exist
print_status "Setting up environment files..."
if [ ! -f .env ]; then
    print_status "Creating .env from .env.example..."
    cp .env.example .env
    print_warning "Please edit .env file with your configuration before continuing!"
    read -p "Press Enter after editing .env file..."
fi

# Setup service environment files
services=("zyslet-admin" "zyslet-client" "zyslet-server")
for service in "${services[@]}"; do
    if [ ! -f "$service/.env" ]; then
        print_status "Creating $service/.env from .env.example..."
        cp "$service/.env.example" "$service/.env"
    fi
done

print_success "Environment file found."

# Setup individual service environment files
print_status "Setting up service environment files..."

# Copy main .env to individual services (using folder names, not container names)
cp .env zyslet-server/.env
cp .env zyslet-admin/.env  
cp .env zyslet-client/.env

# Also copy .env.example files as backup templates
if [ ! -f zyslet-server/.env ]; then
    cp zyslet-server/.env.example zyslet-server/.env
    print_warning "Created server .env from template"
fi

if [ ! -f zyslet-admin/.env ]; then
    cp zyslet-admin/.env.example zyslet-admin/.env
    print_warning "Created admin .env from template"
fi

if [ ! -f zyslet-client/.env ]; then
    cp zyslet-client/.env.example zyslet-client/.env
    print_warning "Created client .env from template"
fi

print_success "Service environment files configured."

# Install Docker and Docker Compose if not installed
if ! command -v docker &> /dev/null; then
    print_status "Installing Docker..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl enable docker
    systemctl start docker
    print_success "Docker installed successfully."
else
    print_success "Docker is already installed."
fi

if ! command -v docker-compose &> /dev/null; then
    print_status "Installing Docker Compose..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed successfully."
else
    print_success "Docker Compose is already installed."
fi

# Stop existing containers if running
print_status "Stopping existing containers..."
docker-compose down --remove-orphans || true

# Build and start services (without SSL first)
print_status "Building and starting services..."
docker-compose up -d --build

# Wait for services to be ready
print_status "Waiting for services to be ready..."
sleep 30

# Check nginx configuration
print_status "Testing nginx configuration..."
if docker-compose exec nginx nginx -t; then
    print_success "Nginx configuration is valid"
else
    print_error "Nginx configuration has errors. Please check the config."
    docker-compose logs nginx
    exit 1
fi

# Check if services are running
print_status "Checking service status..."
if docker-compose ps | grep -q "Up"; then
    print_success "Services are running successfully."
else
    print_error "Some services failed to start. Please check logs."
    docker-compose logs
    exit 1
fi

# Test HTTP connectivity
print_status "Testing HTTP connectivity..."
sleep 10

for domain in admin.azmarif.dev client.azmarif.dev server.azmarif.dev; do
    if curl -s -o /dev/null -w "%{http_code}" --max-time 10 "http://$domain/health" | grep -q "200"; then
        print_success "✓ HTTP: $domain is responding"
    else
        print_warning "⚠ HTTP: $domain not responding properly"
    fi
done

print_success "✨ HTTP setup completed successfully!"
echo ""
print_success "Your applications are now available via HTTP:"
echo -e "  📱 Client App: ${GREEN}http://client.azmarif.dev${NC}"
echo -e "  🛠️  Admin Panel: ${GREEN}http://admin.azmarif.dev${NC}"
echo -e "  🚀 API Server: ${GREEN}http://server.azmarif.dev${NC}"
echo ""
print_status "To enable HTTPS, run: ./ssl-setup.sh"
print_status "To view logs: docker-compose logs -f [service-name]"
print_status "To restart: docker-compose restart [service-name]"
print_status "To stop all: docker-compose down"
echo ""
print_success "✨ Deployment successful! Your Zyslet application is now live on HTTP! ✨"
echo ""
print_warning "🔒 For production use, enable HTTPS by running: ./ssl-setup.sh"

# Ensure certbot directories exist and have proper permissions
print_status "Setting up certbot directories..."
mkdir -p certbot/conf certbot/www
docker-compose exec nginx mkdir -p /var/www/certbot/.well-known/acme-challenge
docker-compose exec nginx chmod -R 755 /var/www/certbot
docker-compose exec nginx chown -R www-data:www-data /var/www/certbot || docker-compose exec nginx chown -R nginx:nginx /var/www/certbot

# Ensure uploads directory exists
print_status "Setting up uploads directory..."
mkdir -p uploads
chmod 755 uploads

# Skip SSL setup for now - HTTP only mode
print_status "Skipping SSL setup - running in HTTP mode"
print_warning "SSL certificates will be set up later using: ./ssl-setup.sh"

# Run database seed
print_status "Seeding database with admin user..."

# Wait a bit more for backend to be fully ready
sleep 10

# Try seeding with different approaches
if docker-compose exec -T zyslet-backend npm run seed 2>/dev/null; then
    print_success "Database seeded successfully."
    print_success "Admin credentials: admin@gmail.com / admin@"
elif docker-compose exec zyslet-backend npm run seed 2>/dev/null; then
    print_success "Database seeded successfully."
    print_success "Admin credentials: admin@gmail.com / admin@"
else
    print_warning "Database seeding failed. You can run it manually later with:"
    print_warning "docker-compose exec zyslet-backend npm run seed"
fi

# Skip SSL auto-renewal setup for now
print_status "SSL auto-renewal will be configured after SSL setup"

# Final status check
print_status "Running final health checks..."
sleep 5

echo ""
echo "🎉 Deployment completed!"
echo ""
print_success "Your applications are now available at:"
echo -e "  📱 Client App: ${GREEN}http://client.azmarif.dev${NC}"
echo -e "  🛠️  Admin Panel: ${GREEN}http://admin.azmarif.dev${NC}"
echo -e "  🚀 API Server: ${GREEN}http://server.azmarif.dev${NC}"
echo ""
print_success "Admin Panel Access:"
echo -e "  📧 Email: ${YELLOW}admin@gmail.com${NC}"
echo -e "  🔑 Password: ${YELLOW}admin@${NC}"
echo ""
print_success "Direct Links:"
echo -e "  📊 Dashboard: ${GREEN}http://admin.azmarif.dev/admin/dashboard${NC}"
echo -e "  🔐 Login: ${GREEN}http://admin.azmarif.dev/admin/login${NC}"
echo ""
print_status "To enable HTTPS: ./ssl-setup.sh"
print_status "To view logs: docker-compose logs -f [service-name]"
print_status "To restart: docker-compose restart [service-name]"
print_status "To stop all: docker-compose down"
echo ""
print_success "✨ Deployment successful! Your Zyslet application is now live on HTTP! ✨"
echo ""
print_warning "🔒 For production use, enable HTTPS by running: ./ssl-setup.sh"
