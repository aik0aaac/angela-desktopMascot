import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Sass読み込み
require("./assets/sass/index.scss");

createApp(App).use(router).mount("#app");
