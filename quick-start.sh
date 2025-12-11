#!/bin/bash

echo "🚀 Alternativ Netdoktor - Quick Start"
echo "===================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js ikke fundet. Installer Node.js 18+ først."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo ""

# Check if PostgreSQL is running
if ! command -v psql &> /dev/null; then
    echo "⚠️  PostgreSQL CLI ikke fundet. Sørg for at PostgreSQL er installeret og kører."
fi

echo "📦 Installerer backend dependencies..."
cd backend
npm install
echo ""

echo "📦 Installerer frontend dependencies..."
cd ../frontend
npm install
cd ..
echo ""

echo "✅ Installation færdig!"
echo ""
echo "Næste skridt:"
echo "1. Konfigurer .env filer i både backend/ og frontend/"
echo "2. Opret PostgreSQL database: createdb alternativenetdoctor"
echo "3. Start backend: cd backend && npm run develop"
echo "4. Start frontend: cd frontend && npm run dev"
echo ""
echo "📖 Læs README.md for detaljeret setup guide"
