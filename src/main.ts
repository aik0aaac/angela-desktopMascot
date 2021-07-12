import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// Sass読み込み
require("./assets/sass/index.sass");

createApp(App).use(router).mount("#app");
