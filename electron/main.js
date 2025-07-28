const {
  app,
  BrowserWindow,
  ipcMain,
  dialog,
  shell,
  nativeTheme,
} = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    icon: path.join(__dirname, "../renderer/public/vite.svg"), // Update with your app icon
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      enableRemoteModule: false,
    },
    titleBarStyle: "default",
    show: false, // Don't show until ready
  });

  const isDev = process.env.NODE_ENV === "development";

  if (isDev) {
    mainWindow.loadURL("http://localhost:5173");
    // Open DevTools in development
    mainWindow.webContents.openDevTools();
  } else {
    // ✅ Use the correct path in packaged apps
    const indexPath = path.join(
      process.resourcesPath,
      "dist-frontend",
      "index.html"
    );
    console.log("🔍 Loading index from:", indexPath);
    if (fs.existsSync(indexPath)) {
      mainWindow.loadFile(indexPath);
    } else {
      console.error("❌ index.html not found at:", indexPath);
    }
  }

  // Show window when ready to prevent visual flash
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  // Handle window closed
  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // Handle external links
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    shell.openExternal(url);
    return { action: "deny" };
  });
}

// App event handlers
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// IPC handlers
ipcMain.handle("ping", () => {
  console.log("🏓 Pong from main process!");
  return "Pong from Electron main process!";
});

// File dialog handlers
ipcMain.handle("dialog:openFile", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [
      { name: "Text Files", extensions: ["txt"] },
      { name: "JSON Files", extensions: ["json"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  if (canceled) {
    return null;
  } else {
    const filePath = filePaths[0];
    const content = fs.readFileSync(filePath, "utf8");
    return { filePath, content };
  }
});

ipcMain.handle("dialog:saveFile", async (event, content) => {
  const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
    filters: [
      { name: "Text Files", extensions: ["txt"] },
      { name: "JSON Files", extensions: ["json"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  if (canceled) {
    return false;
  } else {
    fs.writeFileSync(filePath, content);
    return true;
  }
});

// Window control handlers
ipcMain.handle("window:minimize", () => {
  if (mainWindow) mainWindow.minimize();
});

ipcMain.handle("window:maximize", () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  }
});

ipcMain.handle("window:close", () => {
  if (mainWindow) mainWindow.close();
});

// System info handler
ipcMain.handle("system:getInfo", () => {
  const os = require("os");
  return {
    platform: process.platform,
    arch: process.arch,
    nodeVersion: process.version,
    electronVersion: process.versions.electron,
    chromeVersion: process.versions.chrome,
    totalMemory: os.totalmem(),
    freeMemory: os.freemem(),
    cpus: os.cpus().length,
  };
});

// App info handler
ipcMain.handle("app:getVersion", () => {
  return app.getVersion();
});

// Notification handler
ipcMain.handle("notification:show", (event, title, body) => {
  const { Notification } = require("electron");

  if (Notification.isSupported()) {
    new Notification({
      title,
      body,
    }).show();
    return true;
  }
  return false;
});

// Theme handlers
ipcMain.handle("theme:toggle", () => {
  nativeTheme.themeSource = nativeTheme.shouldUseDarkColors ? "light" : "dark";
  return nativeTheme.shouldUseDarkColors;
});

ipcMain.handle("theme:get", () => {
  return nativeTheme.shouldUseDarkColors ? "dark" : "light";
});

// Listen for theme changes
nativeTheme.on("updated", () => {
  if (mainWindow) {
    mainWindow.webContents.send(
      "theme:changed",
      nativeTheme.shouldUseDarkColors ? "dark" : "light"
    );
  }
});

// Security: Prevent new window creation
app.on("web-contents-created", (event, contents) => {
  contents.on("new-window", (event, navigationUrl) => {
    event.preventDefault();
    shell.openExternal(navigationUrl);
  });
});

console.log("🚀 Electron main process started");
