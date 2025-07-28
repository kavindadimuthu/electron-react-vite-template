# Template Customization Guide

This guide will help you customize the Electron + React + Vite template for your specific project needs.

## 🎯 Quick Setup for New Projects

### 1. Use Template (GitHub)

If this template is on GitHub, click "Use this template" and clone your new repository.

### 2. Manual Setup

```bash
# Clone or copy the template
git clone https://github.com/kavindadimuthu/electron-react-vite-template.git my-new-app
cd electron-react-vite-template

# Run the setup script (optional)
node setup-template.js

# Or manually update the following files:
```

## 📝 Files to Customize

### 1. Package Information

**`package.json`** (root):

```json
{
  "name": "your-app-name",
  "version": "1.0.0",
  "description": "Your app description",
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/your-app-name.git"
  }
}
```

**`renderer/package.json`**:

```json
{
  "name": "your-app-name-renderer"
}
```

### 2. App Title and Branding

**`renderer/index.html`**:

```html
<title>Your App Name</title>
<link rel="icon" type="image/svg+xml" href="/your-icon.svg" />
```

**`electron/main.js`**:

```javascript
const mainWindow = new BrowserWindow({
  width: 1200,
  height: 800,
  title: "Your App Name",
  icon: path.join(__dirname, "../renderer/public/your-icon.png"),
  // ... other options
});
```

### 3. App Content

**`renderer/src/App.tsx`**:

- Replace the template content with your app's UI
- Remove the template showcase components
- Add your main application components

**`renderer/src/App.css`**:

- Customize the styling to match your brand
- Update colors, fonts, and layout

## 🎨 Branding and Assets

### Icons and Images

1. Replace `renderer/public/vite.svg` with your app icon
2. Replace `renderer/src/assets/react.svg` with your logo
3. Add additional assets in `renderer/public/` or `renderer/src/assets/`

### Color Scheme

Update CSS custom properties in `renderer/src/index.css`:

```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  --background-color: #your-color;
  --text-color: #your-color;
}
```

## 🔧 Electron Configuration

### Window Settings

Customize the main window in `electron/main.js`:

```javascript
const mainWindow = new BrowserWindow({
  width: 1200, // Your preferred width
  height: 800, // Your preferred height
  minWidth: 600, // Minimum width
  minHeight: 400, // Minimum height
  resizable: true, // Allow resizing
  titleBarStyle: "default", // 'default', 'hidden', 'hiddenInset'
  frame: true, // Show window frame
  // ... other options
});
```

### Menu Bar

Add a custom menu in `electron/main.js`:

```javascript
const { Menu } = require("electron");

const template = [
  {
    label: "File",
    submenu: [
      {
        label: "New",
        accelerator: "CmdOrCtrl+N",
        click: () => {
          /* handle */
        },
      },
      {
        label: "Open",
        accelerator: "CmdOrCtrl+O",
        click: () => {
          /* handle */
        },
      },
      { type: "separator" },
      { label: "Exit", accelerator: "CmdOrCtrl+Q", role: "quit" },
    ],
  },
  // ... more menu items
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
```

## 🔌 Adding Electron Features

### 1. File Operations

Already included in the template. Use in React:

```typescript
const handleOpenFile = async () => {
  const result = await window.electronAPI.openFile();
  if (result) {
    setFileContent(result.content);
  }
};
```

### 2. System Integration

```typescript
// Get system information
const systemInfo = await window.electronAPI.getSystemInfo();

// Show native notifications
await window.electronAPI.showNotification("Title", "Message");
```

### 3. Custom IPC Communication

Add to `electron/preload.js`:

```javascript
contextBridge.exposeInMainWorld("electronAPI", {
  // ... existing methods
  customMethod: (data) => ipcRenderer.invoke("custom:method", data),
});
```

Add handler in `electron/main.js`:

```javascript
ipcMain.handle("custom:method", async (event, data) => {
  // Handle the custom method
  return result;
});
```

## 📦 Build Configuration

### Packaging Options

Update package scripts in `package.json`:

```json
{
  "scripts": {
    "package:win": "electron-packager . YourApp --platform=win32 --arch=x64 --out=dist --overwrite",
    "package:mac": "electron-packager . YourApp --platform=darwin --arch=x64 --out=dist --overwrite",
    "package:linux": "electron-packager . YourApp --platform=linux --arch=x64 --out=dist --overwrite"
  }
}
```

### Code Signing (Production)

For production apps, add code signing:

```json
{
  "build": {
    "appId": "com.yourcompany.yourapp",
    "productName": "Your App Name",
    "directories": {
      "output": "dist"
    },
    "files": ["dist-frontend/**/*", "electron/**/*", "package.json"],
    "mac": {
      "category": "public.app-category.productivity"
    },
    "win": {
      "target": "nsis"
    },
    "linux": {
      "target": "AppImage"
    }
  }
}
```

## 🧪 Testing Setup

### Unit Testing (React)

```bash
cd renderer
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest
```

### E2E Testing (Electron)

```bash
npm install --save-dev spectron
```

## 🚀 Deployment

### Auto-updater

For automatic updates, consider using `electron-updater`:

```bash
npm install electron-updater
```

### CI/CD

Set up GitHub Actions for automated building:

```yaml
# .github/workflows/build.yml
name: Build
on: [push, pull_request]
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: "18"
      - run: npm install
      - run: npm run build
      - run: npm run package
```

## 📋 Checklist for New Projects

- [ ] Update `package.json` with your app details
- [ ] Update `renderer/package.json` name
- [ ] Change app title in `renderer/index.html`
- [ ] Replace template content in `App.tsx`
- [ ] Add your app icon and assets
- [ ] Customize colors and styling
- [ ] Update window configuration in `electron/main.js`
- [ ] Add custom Electron features as needed
- [ ] Update README.md with your project info
- [ ] Set up version control with your repository
- [ ] Configure build and deployment pipeline
- [ ] Add proper licensing
- [ ] Test on all target platforms

## 🆘 Common Issues

### Port Already in Use

```bash
npx kill-port 5173
```

### Build Fails

```bash
npm run clean
npm run setup
npm run build
```

### TypeScript Errors

- Check `renderer/tsconfig.json` configuration
- Ensure all types are properly defined
- Update type definitions in `src/types/index.ts`

Happy coding! 🎉
