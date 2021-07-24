<template>
  <enabled-click-element @click="exitApp" class="exit-app">
    <template #contents>
      <button v-if="isDisplayMoveButton" class="move-window">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </template>
  </enabled-click-element>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import EnabledClickElement from "./EnabledClickElement.vue";

/**
 * Electronの画面を動かせるボタンを提供するコンポーネント。
 */
export default defineComponent({
  components: {
    EnabledClickElement,
  },
  name: "MoveWindowButton",
  setup() {
    /**
     * ウィンドウ移動ボタンを表示させるかどうか。
     * Windowsでは`-webkit-app-region: drag;`を使用したウィンドウ移動が出来なかった。
     * 暫定対応として、本ボタンはWindows環境では表示させないようにする。
     */
    const isDisplayMoveButton = computed(() => {
      return (
        window.navigator.userAgent.toLowerCase().indexOf("windows nt") === -1
      );
    });
    return { isDisplayMoveButton };
  },
});
</script>

<style scoped lang="sass">
.move-window
  -webkit-app-region: drag
  cursor: move

  display: inline-block
  position: relative
  width: var(--app-bar-button-width)
  height: var(--app-bar-button-height)
  background: none
  border: none
  appearance: none
  transition: all 0.4s
  box-sizing: border-box

  span
    position: absolute
    left: 0
    width: 100%
    height: calc(var(--app-bar-button-height) / 5)
    background-color: #fff
    border-radius: 3px
    &:nth-of-type(1)
      top: 0
    &:nth-of-type(2)
      top: calc(var(--app-bar-button-height) / 2 - 1px)
    &:nth-of-type(3)
      bottom: 0
</style>
