import { createApp, provide } from "vue";
import App from "./App.vue";
import router from "./router";
import { AnimationStoreKey, useAnimationStore } from "./store/animation";

// Sass読み込み
require("./assets/sass/index.scss");

const app = createApp(App);
// アニメーション再生&管理インスタンス用のStoreを生成
app.provide(AnimationStoreKey, useAnimationStore());
// Routerをバインド
app.use(router);
// HTML上にバインド
app.mount("#app");
