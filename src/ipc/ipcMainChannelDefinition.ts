import { ipcMain } from "electron";

/**
 * メインプロセス内で使用可能なchannelリスト。
 */
export const ipcMainChannnelDefinition = {
  /**
   * アプリケーションを終了します。
   */
  killApp: "killApp",
  /**
   * マウスイベントの無視状態をOFFにする。
   * ※マウスで要素がクリックできる様にする。
   */
  enableMouseEvents: "enableMouseEvents",
  /**
   * マウスイベントの無視状態をONにする。
   * ※マウスで要素がクリックできない様にする。
   */
  disableMouseEvents: "disableMouseEvents",
};
