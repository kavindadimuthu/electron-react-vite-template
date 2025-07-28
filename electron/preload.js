// electron/preload.js
const { contextBridge, ipcRenderer } = require("electron");

// Expose Electron APIs to the renderer process through contextBridge
// This is the secure way to expose Electron functionality to React
contextBridge.exposeInMainWorld("electronAPI", {
  // Basic ping for testing communication
  ping: () => ipcRenderer.invoke("ping"),

  // File operations (implement these in main.js)
  openFile: () => ipcRenderer.invoke("dialog:openFile"),
  saveFile: (content) => ipcRenderer.invoke("dialog:saveFile", content),

  // Window operations
  minimizeWindow: () => ipcRenderer.invoke("window:minimize"),
  maximizeWindow: () => ipcRenderer.invoke("window:maximize"),
  closeWindow: () => ipcRenderer.invoke("window:close"),

  // System information
  getSystemInfo: () => ipcRenderer.invoke("system:getInfo"),

  // App information
  getAppVersion: () => ipcRenderer.invoke("app:getVersion"),

  // Notifications
  showNotification: (title, body) =>
    ipcRenderer.invoke("notification:show", title, body),

  // Event listeners for main process events
  onMenuAction: (callback) => ipcRenderer.on("menu:action", callback),
  offMenuAction: (callback) =>
    ipcRenderer.removeListener("menu:action", callback),

  // Theme handling
  onThemeChanged: (callback) => ipcRenderer.on("theme:changed", callback),
  offThemeChanged: (callback) =>
    ipcRenderer.removeListener("theme:changed", callback),

  // Remove specific listeners
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
});

// Log that preload script has loaded
console.log("🔌 Preload script loaded successfully");
