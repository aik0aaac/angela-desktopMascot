"use strict";

import { app, protocol, BrowserWindow, ipcMain, screen } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import installExtension from "electron-devtools-installer";
import { ipcMainChannnelDefinition } from "./ipc/ipcMainChannelDefinition";
import { AppConfig } from "./config/appConfig";
const isDevelopment = process.env.NODE_ENV !== "production";

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

// デバッグモード(ChromeDevTools使用モード)時の制御
const isDebug = true;

// Electron Window格納変数。
let win: BrowserWindow;
async function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: AppConfig.windowScreenWidth,
    height: AppConfig.windowScreenHeight,
    webPreferences: {
      // Spectronテスト時に要求される
      enableRemoteModule: !!process.env.IS_TEST,
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: process.env
        .ELECTRON_NODE_INTEGRATION as unknown as boolean,
      contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
    },
    transparent: true, // 背景の透明化
    frame: false, // フレームを非表示にする
    resizable: false, // ウィンドウリサイズ禁止
    alwaysOnTop: true, // 常に最前面に表示
    hasShadow: false, // デスクトップアプリの影をなくす(MacOS対応)
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string);
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }

  if (!isDebug) {
    // デバッグモードかつテスト環境の場合は、ウィンドウが起動した際にChrome DevToolsを開く
    if (!process.env.IS_TEST) win.webContents.openDevTools();
    // マウスイベントを無視
    // mouseenterやmouseleaveといったイベントを検知できるようにするため、`forward`オプションを追加
    win.setIgnoreMouseEvents(true, { forward: true });
  }

  // 画面を右下端に移動
  win.setPosition(
    screen.getPrimaryDisplay().size.width - AppConfig.windowScreenWidth,
    screen.getPrimaryDisplay().size.height - AppConfig.windowScreenHeight
  );
}

// 背景を透明化するため、ハードウェアアクセラレーションをOFF…にしたいが、そうするとPixi.jsが動かなくなるためONにする
// https://github.com/pixijs/pixijs/issues/5694#issuecomment-498629435
// app.disableHardwareAcceleration();

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS);
    } catch (e) {
      console.error("Vue Devtools failed to install:", e.toString());
    }
  }
  createWindow();
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

/********************************************
 * IPC通信関連の処理。
 * レンダラープロセスから送信可能なIPC通信の処理部分を記載。
 ********************************************/

/**
 * アプリを終了させる。
 */
ipcMain.handle(ipcMainChannnelDefinition.killApp, () => {
  console.info("アプリを終了します。");
  app.quit();
});

/**
 * マウスイベントの無視状態をOFFにする。
 * ※マウスで要素がクリックできる様にする。
 * ※デバッグモード時は何もしない。
 */
ipcMain.handle("enableMouseEvents", () => {
  if (!isDebug) {
    win.setIgnoreMouseEvents(false);
  }
});

/**
 * マウスイベントの無視状態をONにする。
 * ※マウスで要素がクリックできない様にする。
 * ※デバッグモード時は何もしない。
 */
ipcMain.handle("disableMouseEvents", () => {
  if (!isDebug) {
    win.setIgnoreMouseEvents(true, {
      forward: true,
    });
  }
});
