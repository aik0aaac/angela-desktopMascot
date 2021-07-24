<template>
  <span v-on:mouseenter="onMouseEnter" v-on:mouseleave="onMouseLeave">
    <slot name="contents"></slot>
  </span>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ipcRenderer } from "electron";
import { ipcMainChannnelDefinition } from "@/ipc/ipcMainChannelDefinition";

/**
 * クリック可能なコンポーネント。
 * 本アプリはデスクトップマスコットであるため。本来であれば画面上の要素にはクリックできない。
 * 当コンポーネントでラップさせることで、ラップされたコンポーネントはクリックが可能となる。
 */
export default defineComponent({
  name: "EnabledClickElement",
  setup() {
    const onMouseEnter = async () => {
      await ipcRenderer.invoke(ipcMainChannnelDefinition.enableMouseEvents);
    };
    const onMouseLeave = async () => {
      await ipcRenderer.invoke(ipcMainChannnelDefinition.disableMouseEvents);
    };
    return {
      onMouseEnter,
      onMouseLeave,
    };
  },
});
</script>
