# 🔥 HotCrunch

A modern desktop application built with Electron, Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

## 🚀 Features

- **Electron** - Cross-platform desktop app framework
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Beautiful, accessible UI components
- **IPC Communication** - Secure communication between main and renderer processes
- **Hot Reload** - Fast development with automatic reloading
- **Static Export** - Optimized builds for Electron packaging

## 📁 Project Structure

```
HotCrunch/
├── electron/           # Electron main process
│   ├── main.ts        # Main Electron process
│   ├── util.ts        # Utility functions
│   └── tsconfig.json  # TypeScript config for Electron
├── preload/           # Electron preload scripts
│   ├── preload.ts     # Preload script for IPC
│   └── tsconfig.json  # TypeScript config for preload
├── src/               # Next.js application
│   ├── app/          # App Router pages
│   ├── components/   # React components (including shadcn/ui)
│   ├── lib/          # Utility libraries
│   └── types/        # TypeScript type definitions
├── dist-electron/     # Compiled Electron files
├── out/              # Next.js static export
└── release/          # Built Electron applications
```

## 🛠️ Prerequisites

- Node.js 18+ 
- npm or yarn

## 📦 Installation

1. Clone the repository or navigate to the HotCrunch directory
2. Install dependencies:

```bash
npm install
```

## 🚀 Development

### Run in Development Mode

```bash
# Start Next.js dev server and Electron together
npm run electron:dev
```

This will:
1. Start the Next.js development server on http://localhost:3000
2. Compile the Electron TypeScript files
3. Launch the Electron app

### Run Only Next.js (Web Mode)

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view in browser.

### Build Electron App

```bash
# Build for production
npm run electron:build
```

This will:
1. Build the Next.js app as static files
2. Compile Electron TypeScript files
3. Package the Electron app for your platform

## 📝 Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build Next.js for production
- `npm run electron:dev` - Start development with Electron
- `npm run electron:build` - Build and package Electron app
- `npm run build:electron` - Compile Electron TypeScript files
- `npm run lint` - Run ESLint

## 🎨 UI Components

This project uses [shadcn/ui](https://ui.shadcn.com/) components. To add more components:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog input label
```

## 🔧 Electron IPC

The app includes a secure IPC (Inter-Process Communication) setup:

- **Main Process** (`electron/main.ts`) - Handles system-level operations
- **Preload Script** (`preload/preload.ts`) - Safely exposes APIs to renderer
- **Renderer Process** (`src/app/page.tsx`) - React app with access to Electron APIs

### Example IPC Usage

```typescript
// In React components
if (window.electronAPI) {
  // Send message to main process
  await window.electronAPI.sendMessage("Hello Electron!");
  
  // Get platform information
  const platform = window.electronAPI.getPlatform();
}
```

## 🔨 Building for Distribution

The app uses electron-builder for packaging. Builds are output to the `release/` directory.

### Build for Current Platform
```bash
npm run electron:build
```

### Platform-Specific Builds
```bash
# Additional electron-builder commands can be added to package.json
npx electron-builder --mac
npx electron-builder --win
npx electron-builder --linux
```

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🐛 Troubleshooting

### Linux Sandbox Issues
If you encounter sandbox-related errors on Linux:

1. **Already Fixed**: The project includes `--no-sandbox` flags
2. **Alternative**: Use `npm run electron:dev-clean` for cleaner output
3. **Manual Fix**: If needed, run:
   ```bash
   sudo chown root:root node_modules/electron/dist/chrome-sandbox
   sudo chmod 4755 node_modules/electron/dist/chrome-sandbox
   ```

### Common Issues
- **Port 3000 in use**: Change port in package.json or stop other services
- **DevTools errors**: Use `npm run electron:dev-clean` for production-like environment
- **Build failures**: Run `npm run build:electron` to check TypeScript compilation

## 🔗 Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
