<template>
  <enabled-click-element @click="exitApp" class="exit-app">
    <template #contents>
      <button @click="exitApp" class="exit-button"></button>
    </template>
  </enabled-click-element>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "electron";
import { ipcMainChannnelDefinition } from "@/ipc/ipcMainChannelDefinition";
import EnabledClickElement from "../common/EnabledClickElement.vue";

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

<style scoped lang="sass">
.exit-button
  display: inline-block
  width: var(--app-bar-button-size)
  height: var(--app-bar-button-size)
  position: relative
  background: transparent
  border: none
  cursor: pointer

  &::before,
  &::after
    content: ""
    position: absolute
    top: calc(14% - 2px)
    left: 14%
    display: block
    width: 100% // バツ線の長さ
    height: 2px // バツ線の太さ
    background: #fff
    transform: rotate(45deg)
    transform-origin: 0% 50%

  &::after
    transform: rotate(-45deg)
    transform-origin: 100% 50%
    left: auto
    right: 14%
</style>
