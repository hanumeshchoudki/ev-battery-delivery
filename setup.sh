#!/bin/bash

# ನಮ್ಮ Charge - Automated Setup Script
# This script will help you set up the entire project quickly

set -e  # Exit on error

echo "🔋 ನಮ್ಮ Charge - Setup Script"
echo "================================"
echo ""

# Color codes for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
echo "📦 Checking prerequisites..."
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js v18 or higher.${NC}"
    echo "Download from: https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js version is $NODE_VERSION. Please upgrade to v18 or higher.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"

# Check for package manager
if command -v pnpm &> /dev/null; then
    PKG_MANAGER="pnpm"
    echo -e "${GREEN}✅ pnpm detected${NC}"
elif command -v npm &> /dev/null; then
    PKG_MANAGER="npm"
    echo -e "${GREEN}✅ npm detected${NC}"
else
    echo -e "${RED}❌ No package manager found${NC}"
    exit 1
fi

echo ""
echo "📥 Installing dependencies..."
echo ""

# Install frontend dependencies
echo "→ Installing frontend dependencies..."
$PKG_MANAGER install

# Install backend dependencies
echo ""
echo "→ Installing backend dependencies..."
cd backend
npm install
cd ..

echo ""
echo -e "${GREEN}✅ All dependencies installed successfully!${NC}"
echo ""

# Check for environment files
echo "🔧 Checking environment configuration..."

if [ ! -f ".env.local" ]; then
    echo -e "${YELLOW}⚠️  .env.local not found. Creating from example...${NC}"
    if [ -f ".env.example" ]; then
        cp .env.example .env.local
        echo -e "${GREEN}✅ Created .env.local${NC}"
    else
        echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local
        echo -e "${GREEN}✅ Created .env.local with default values${NC}"
    fi
else
    echo -e "${GREEN}✅ .env.local exists${NC}"
fi

if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found. Creating from example...${NC}"
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo -e "${YELLOW}⚠️  Created backend/.env - PLEASE UPDATE WITH YOUR SUPABASE CREDENTIALS${NC}"
    else
        cat > backend/.env << EOL
SUPABASE_URL=your_supabase_project_url_here
SUPABASE_SERVICE_KEY=your_service_role_key_here
JWT_SECRET=$(openssl rand -hex 32)
PORT=5000
NODE_ENV=development
EOL
        echo -e "${YELLOW}⚠️  Created backend/.env - PLEASE UPDATE WITH YOUR SUPABASE CREDENTIALS${NC}"
    fi
else
    echo -e "${GREEN}✅ backend/.env exists${NC}"
fi

echo ""
echo "================================"
echo -e "${GREEN}🎉 Setup Complete!${NC}"
echo "================================"
echo ""
echo "📋 Next Steps:"
echo ""
echo "1. Setup Supabase Database:"
echo "   - Go to https://supabase.com and create a project"
echo "   - Run the SQL in backend/database/schema.sql"
echo "   - Get your credentials from Settings → API"
echo ""
echo "2. Update backend/.env with your Supabase credentials:"
echo "   - SUPABASE_URL"
echo "   - SUPABASE_SERVICE_KEY"
echo ""
echo "3. Start the development servers:"
echo ""
echo "   Terminal 1 (Backend):"
echo "   $ cd backend && npm run dev"
echo ""
echo "   Terminal 2 (Frontend):"
echo "   $ npm run dev"
echo ""
echo "4. Open http://localhost:3000 in your browser"
echo ""
echo "📖 For detailed instructions, see SETUP.md"
echo ""
