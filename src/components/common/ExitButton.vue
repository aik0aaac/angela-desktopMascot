<template>
  <enabled-click-element @click="exitApp" class="exit-app">
    <template #contents>
      <button @click="exitApp" class="exit-app"></button>
    </template>
  </enabled-click-element>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "electron";
import { ipcMainChannnelDefinition } from "@/ipc/ipcMainChannelDefinition";
import EnabledClickElement from "./EnabledClickElement.vue";

/**
 * Electronのアプリ終了ボタンを提供するコンポーネント。
 */
export default defineComponent({
  components: {
    EnabledClickElement,
  },
  name: "ExitButton",
  setup() {
    /**
     * アプリ終了処理。
     */
    const exitApp = async () => {
      await ipcRenderer.invoke(ipcMainChannnelDefinition.killApp);
    };
    return {
      exitApp,
    };
  },
});
</script>

<style scoped lang="scss">
.exit-button {
  display: block;
  width: var(--button-width);
  height: var(--button-height);
  position: relative;
  background: transparent;
  border: none;
  cursor: pointer;
  opacity: var(--control-parts-opacity);

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: calc(14% - 8px);
    left: 14%;
    display: block;
    width: 100%; /*バツ線の長さ*/
    height: 8px; /*バツ線の太さ*/
    background: #fff;
    transform: rotate(45deg);
    transform-origin: 0% 50%;
  }
  &::after {
    transform: rotate(-45deg);
    transform-origin: 100% 50%;
    left: auto;
    right: 14%;
  }
}
</style>
