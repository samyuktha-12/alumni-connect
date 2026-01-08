#!/bin/bash

echo "🚀 Setting up Alumni Connect..."

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.11+ first."
    exit 1
fi

echo "✅ Prerequisites check passed"

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
npm install

# Set up backend
echo "🐍 Setting up Python backend..."
cd backend

if [ ! -d "venv" ]; then
    python3 -m venv venv
fi

source venv/bin/activate
pip install -r requirements.txt
deactivate

cd ..

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "📝 Creating .env file..."
    if [ -f "env.example" ]; then
        cp env.example .env
    else
        echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env
    fi
    echo "✅ Created .env file with default configuration."
    echo "   Edit .env to change NEXT_PUBLIC_API_URL if needed."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the application:"
echo "  1. Terminal 1 - Backend:  cd backend && source venv/bin/activate && uvicorn main:app --reload"
echo "  2. Terminal 2 - Frontend: npm run dev"
echo ""
echo "Visit http://localhost:3000 to see the application"

