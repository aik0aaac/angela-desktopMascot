<template>
  <!-- Exitボタン、ウィンドウ移動ボタン -->
  <section class="app-bar">
    <move-window-button class="app-bar--move-window-button" />
    <exit-button class="app-bar--exit-button" />
  </section>

  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import MoveWindowButton from "@/components/appBar/MoveWindowButton.vue";
import ExitButton from "@/components/appBar/ExitButton.vue";

export default defineComponent({
  name: "App",
  components: {
    MoveWindowButton,
    ExitButton,
  },
});
</script>

<style scoped lang="sass">
// Exitボタン、ウィンドウ移動ボタン全体を包むラッパー
.app-bar
  width: 100%
  padding-right: calc(var(--base-pixel) * 2)
  text-align: right
  opacity: var(--app-bar-opacity)
  // ウィンドウを動かすボタン
  &--move-window-button
    margin-right: calc(var(--app-bar-button-size) + calc(var(--base-pixel)*1))
</style>
