#!/bin/bash

echo "🔥 HotCrunch Demo Script"
echo "======================"
echo ""

echo "1. Building Electron TypeScript files..."
npm run build:electron

echo ""
echo "2. Building Next.js application..."
npm run build

echo ""
echo "✅ Build completed successfully!"
echo ""
echo "To run the application:"
echo "- Development (with DevTools): npm run electron:dev"
echo "- Development (clean): npm run electron:dev-clean"
echo "- Production build: npm run electron:build"
echo "- Web only: npm run dev"
echo ""
echo "Project structure:"
echo "- Electron main process: electron/main.ts"
echo "- Preload script: preload/preload.ts"
echo "- Next.js app: src/app/page.tsx"
echo "- UI components: src/components/ui/"
echo ""
echo "Happy coding! 🚀"

