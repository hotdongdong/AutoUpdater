import { app, BrowserWindow } from "electron";
import { autoUpdater } from "electron-updater";
import path from "path";

if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // const isDevelopment = process.env.NODE_ENV === "development";

  // isDevelopment && mainWindow.webContents.openDevTools();
  mainWindow.webContents.openDevTools();
};

// 测试在开发环境中强制启动自动更新，可以删除
Object.defineProperty(app, "isPackaged", {
  get() {
    return true;
  },
});

app.on("ready", () => {
  createWindow();

  const url = "http://127.0.0.1:8188";

  autoUpdater.setFeedURL(url);

  autoUpdater.on("update-available", () => {
    console.log("Update available...");
  });

  autoUpdater.on("update-not-available", () => {
    console.log("No update available...");
  });

  autoUpdater.on("error", (error) => {
    console.error("Auto update error:", error.message);
  });

  autoUpdater.checkForUpdates();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
