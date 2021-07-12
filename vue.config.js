module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // アプリのアイコン設定
      mac: {
        icon: "src/assets/app.png",
      },
      win: {
        icon: "src/assets/app.png",
      },
    },
  },
};
