<template>
  <enabled-click-element @click="exitApp">
    <template #contents>
      <button @click="onClickTalkButton" class="talk-button"></button>
    </template>
  </enabled-click-element>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import EnabledClickElement from "../common/EnabledClickElement.vue";

/**
 * 会話トリガーボタンコンポーネント。
 */
export default defineComponent({
  components: {
    EnabledClickElement,
  },
  name: "TalkButton",
  setup() {
    const onClickTalkButton = () => {
      console.log("talkbutton click");
    };

    return { onClickTalkButton };
  },
});
</script>

<style scoped lang="sass">
.talk-button
  display: inline-block
  width: var(--talk-button-size)
  height: var(--talk-button-size)
  position: relative
  background: #aa0
  border: none
  cursor: pointer
</style>
