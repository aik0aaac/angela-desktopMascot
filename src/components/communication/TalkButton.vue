<template>
  <enabled-click-element>
    <template #contents>
      <button @click="onClickTalkButton" class="talk-button"></button>
    </template>
  </enabled-click-element>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import EnabledClickElement from "../common/EnabledClickElement.vue";
import { AnimationStoreKey, AnimationStore } from "@/store/animation";

/**
 * 会話トリガーボタンコンポーネント。
 */
export default defineComponent({
  name: "TalkButton",
  components: {
    EnabledClickElement,
  },
  setup() {
    // アニメーション再生&管理インスタンス用のStore処理を取得
    const animationStore = inject(AnimationStoreKey) as AnimationStore;

    // トークボタンクリック時の処理
    const onClickTalkButton = () => {
      animationStore.talk();
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
  background-color: rgba(0, 0, 0, 0)
  background-image: url("~@/assets/img/balloon.png")
  background-repeat: no-repeat
  background-size: cover
  border: none
  opacity: var(--opacity)
  cursor: pointer
</style>
