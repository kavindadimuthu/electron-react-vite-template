# Electron + React + Vite Template

A modern, fast, and feature-rich Electron application template with React, Vite, and TypeScript.

## ✨ Features

- ⚡ **Fast Development** - Powered by Vite for lightning-fast HMR
- ⚛️ **React 19** - Latest React with modern hooks
- 🔷 **TypeScript** - Full TypeScript support with strict configuration
- 🖥️ **Electron** - Cross-platform desktop app framework
- 📦 **Easy Packaging** - Build for Windows, macOS, and Linux
- 🔧 **ESLint** - Code linting with React-specific rules
- 🎨 **Modern CSS** - CSS modules and modern styling support
- 🚀 **Hot Reload** - Instant updates during development

## 📁 Project Structure

```
electron-react-vite-template/
├── electron/                 # Electron main process files
│   ├── main.js              # Main Electron process
│   └── preload.js           # Preload script for secure IPC
├── renderer/                # React frontend (renderer process)
│   ├── public/              # Static assets
│   ├── src/                 # React source code
│   │   ├── components/      # Reusable React components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── utils/           # Utility functions
│   │   ├── App.tsx          # Main App component
│   │   └── main.tsx         # React entry point
│   ├── package.json         # Frontend dependencies
│   ├── vite.config.ts       # Vite configuration
│   └── tsconfig.json        # TypeScript configuration
├── dist/                    # Built Electron apps (generated)
├── dist-frontend/           # Built React app (generated)
├── package.json             # Main project configuration
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Option 1: Use as Template (Recommended)

1. **Click "Use this template"** button on GitHub
2. **Clone your new repository:**
   ```bash
   git clone https://github.com/yourusername/your-app-name.git
   cd your-app-name
   ```

### Option 2: Clone Directly

```bash
git clone https://github.com/yourusername/electron-react-vite-template.git my-app
cd my-app
```

### Setup and Installation

1. **Install dependencies:**

   ```bash
   npm run setup
   ```

   or manually:

   ```bash
   npm install
   cd renderer
   npm install
   cd ..
   ```

2. **Start development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**

   ```bash
   npm run build
   ```

4. **Package the app:**

   ```bash
   # For current platform
   npm run package

   # For all platforms
   npm run package:all

   # For specific platforms
   npm run package:win
   npm run package:mac
   npm run package:linux
   ```

## 📜 Available Scripts

### Main Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the React app for production
- `npm run package` - Package the app for current platform
- `npm run package:all` - Package for Windows, macOS, and Linux
- `npm run clean` - Clean build artifacts
- `npm run setup` - Install all dependencies

### Renderer Scripts (Frontend)

- `cd renderer && npm run dev` - Start Vite development server
- `cd renderer && npm run build` - Build React app
- `cd renderer && npm run lint` - Run ESLint
- `cd renderer && npm run preview` - Preview production build

## 🔧 Configuration

### Customizing Your App

1. **Update app information** in `package.json`:

   ```json
   {
     "name": "your-app-name",
     "version": "1.0.0",
     "description": "Your app description",
     "author": "Your Name <your.email@example.com>"
   }
   ```

2. **Update renderer package.json** in `renderer/package.json`:

   ```json
   {
     "name": "your-app-renderer"
   }
   ```

3. **Modify window properties** in `electron/main.js`:

   ```javascript
   const win = new BrowserWindow({
     width: 1200, // Your preferred width
     height: 800, // Your preferred height
     title: "Your App Name",
   });
   ```

4. **Update HTML title** in `renderer/index.html`:
   ```html
   <title>Your App Name</title>
   ```

### Build Configuration

The template includes optimized build configurations for:

- **Vite** (`renderer/vite.config.ts`) - Frontend bundling
- **TypeScript** (`renderer/tsconfig.json`) - Type checking
- **ESLint** (`renderer/eslint.config.js`) - Code linting

## 🏗️ Development Workflow

1. **Start development:**

   ```bash
   npm run dev
   ```

   This starts both the Vite dev server and Electron app with hot reload.

2. **Make changes** to your React components in `renderer/src/`

3. **Add Electron features** by modifying:

   - `electron/main.js` - Main process (menus, windows, native APIs)
   - `electron/preload.js` - Secure bridge between main and renderer

4. **Build and test:**
   ```bash
   npm run build
   npm run package
   ```

## 📦 Packaging & Distribution

### Package for Different Platforms

```bash
# Current platform only
npm run package

# All platforms
npm run package:all

# Specific platforms
npm run package:win    # Windows
npm run package:mac    # macOS
npm run package:linux  # Linux
```

### Customizing Package Output

Modify the package scripts in `package.json` to customize:

- Output directory (`--out=dist`)
- App name (`MyApp`)
- Target architecture (`--arch=x64`)
- Additional resources (`--extra-resource=dist-frontend`)

## 🔒 Security

This template includes security best practices:

- **Preload script** for secure IPC communication
- **Context isolation** enabled
- **Node integration** disabled in renderer
- **Content Security Policy** ready for implementation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Port 5173 already in use:**

```bash
# Kill the process using the port
npx kill-port 5173
```

**Build fails:**

```bash
# Clean and rebuild
npm run clean
npm run setup
npm run build
```

**Electron app won't start:**

- Check Node.js version (18+ required)
- Ensure all dependencies are installed
- Check console for error messages

### Getting Help

- 📚 [Electron Documentation](https://electronjs.org/docs)
- ⚛️ [React Documentation](https://react.dev)
- ⚡ [Vite Documentation](https://vitejs.dev)
- 🔷 [TypeScript Documentation](https://typescriptlang.org/docs)

## 🎯 Next Steps

After setting up your app from this template:

1. **Customize the UI** - Replace the demo React components
2. **Add features** - Implement your app's functionality
3. **Configure menus** - Add native app menus in `electron/main.js`
4. **Add icons** - Replace default icons with your app's branding
5. **Setup auto-updater** - Implement automatic updates
6. **Add tests** - Set up Jest/Vitest for testing
7. **CI/CD** - Configure GitHub Actions for automated builds

Happy coding! 🚀
