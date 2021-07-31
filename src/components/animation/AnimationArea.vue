<template>
  <section class="animation-area">
    <div class="talk-area-wrapper">
      <talk-area />
    </div>
    <div id="animation-area"></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount, inject } from "vue";
import TalkArea from "@/components/communication/TalkArea.vue";
import { AnimationStoreKey, AnimationStore } from "@/store/animation";

export default defineComponent({
  name: "AnimationArea",
  components: {
    TalkArea,
  },
  setup() {
    // アニメーション再生&管理インスタンス用のStore処理を取得
    const animationStore = inject(AnimationStoreKey) as AnimationStore;

    onMounted(() => {
      animationStore.init();
    });
    onBeforeUnmount(() => {
      animationStore.destroy();
    });
  },
});
</script>

<style lang="sass" scoped>
.animation-area
  width: 100%
  text-align: right
// トーク領域
.talk-area-wrapper
  display: inline-block
  position: absolute
  top: calc(var(--base-pixel) * 2)
  right: calc(var(--base-pixel) * 80)
</style>
