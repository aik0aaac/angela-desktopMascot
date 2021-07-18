<template>
  <div class="wrapper">
    <!-- アプリ終了ボタン -->
    <exit-button class="exit-button" />
    <!-- ウィンドウを動かせるボタン -->
    <move-window-button class="move-window-button" />
  </div>

  <div class="home">
    <animation-test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoveWindowButton from "@/components/common/MoveWindowButton.vue";
import ExitButton from "@/components/common/ExitButton.vue";
import AnimationTest from "@/components/AnimationTest.vue";

export default defineComponent({
  name: "Home",
  components: {
    MoveWindowButton,
    ExitButton,
    AnimationTest,
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
