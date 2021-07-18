<template>
  <div class="wrapper">
    <!-- アプリ終了ボタン -->
    <exit-button class="exit-button" />

    <!-- ウィンドウを動かせるボタン -->
    <move-window-button class="move-window-button" />
    <a href="https://get.webgl.org/"></a>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoveWindowButton from "@/components/common/MoveWindowButton.vue";
import ExitButton from "@/components/common/ExitButton.vue";

export default defineComponent({
  name: "HelloWorld",
  components: {
    MoveWindowButton,
    ExitButton,
  },
});
</script>

<style scoped lang="scss">
// 全体を包むラッパー
.wrapper {
  margin-top: 24px;
  position: relative;
}
// アプリ終了ボタン
.exit-button {
  position: absolute;
  right: 0;
}
// ウィンドウを動かせるボタン
.move-window-button {
  position: absolute;
  right: calc(var(--button-width) + 16px);
}
</style>
