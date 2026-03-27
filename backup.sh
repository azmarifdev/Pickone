#!/bin/bash

# Zyslet Production Backup Script
# Creates backups of database and uploaded files

set -e

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

# Configuration
BACKUP_DIR="/root/zyslet-backups"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_BACKUP_NAME="zyslet_db_backup_${DATE}"
FILES_BACKUP_NAME="zyslet_files_backup_${DATE}"

echo "🔄 Starting Zyslet Production Backup..."

# Create backup directory
mkdir -p "$BACKUP_DIR"

# Database backup
print_status "Creating database backup..."
if docker-compose exec -T mongodb mongodump --host localhost --port 27017 --db zyslet-db --username zyslet-db --password OQAEKyl6PEhxFF59 --authenticationDatabase admin --out /tmp/backup 2>/dev/null; then
    
    # Copy backup from container to host
    docker cp zyslet-mongodb:/tmp/backup "$BACKUP_DIR/$DB_BACKUP_NAME"
    
    # Create compressed archive
    cd "$BACKUP_DIR"
    tar -czf "${DB_BACKUP_NAME}.tar.gz" "$DB_BACKUP_NAME"
    rm -rf "$DB_BACKUP_NAME"
    
    print_success "Database backup created: ${DB_BACKUP_NAME}.tar.gz"
else
    print_error "Database backup failed!"
fi

# Files backup
print_status "Creating files backup..."
if [ -d "server-tmp" ]; then
    cd /data/Code/code-encover/zyslet-deploy
    tar -czf "$BACKUP_DIR/${FILES_BACKUP_NAME}.tar.gz" server-tmp/
    print_success "Files backup created: ${FILES_BACKUP_NAME}.tar.gz"
else
    print_warning "No server-tmp directory found to backup"
fi

# Environment backup
print_status "Creating environment backup..."
if [ -f ".env" ]; then
    cp .env "$BACKUP_DIR/env_backup_${DATE}.txt"
    print_success "Environment backup created: env_backup_${DATE}.txt"
fi

# Docker compose backup
cp docker-compose.yaml "$BACKUP_DIR/docker-compose_backup_${DATE}.yaml"
cp nginx.conf "$BACKUP_DIR/nginx_backup_${DATE}.conf"

# Cleanup old backups (keep last 7 days)
print_status "Cleaning up old backups..."
find "$BACKUP_DIR" -name "*.tar.gz" -mtime +7 -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "*.txt" -mtime +7 -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "*.yaml" -mtime +7 -delete 2>/dev/null || true
find "$BACKUP_DIR" -name "*.conf" -mtime +7 -delete 2>/dev/null || true

# Show backup summary
echo ""
print_success "Backup completed successfully!"
echo ""
print_status "Backup location: $BACKUP_DIR"
print_status "Available backups:"
ls -la "$BACKUP_DIR" | grep "${DATE}"

echo ""
print_status "To restore database backup:"
echo "  1. Extract: tar -xzf ${DB_BACKUP_NAME}.tar.gz"
echo "  2. Restore: docker-compose exec mongodb mongorestore --host localhost --port 27017 --username zyslet-db --password OQAEKyl6PEhxFF59 --authenticationDatabase admin /tmp/restore-path"

print_status "To restore files backup:"
echo "  1. Extract: tar -xzf ${FILES_BACKUP_NAME}.tar.gz"
echo "  2. Replace: cp -r server-tmp/* /path/to/current/server-tmp/"
