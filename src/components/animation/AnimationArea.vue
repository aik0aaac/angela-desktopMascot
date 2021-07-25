<template>
  <section id="animation-area">
    <div class="talk-area-wrapper">
      <talk-area />
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, onBeforeUnmount } from "vue";
import { AngelaAnimation } from "@/animation/angela";
import TalkArea from "@/components/animation/TalkArea.vue";

export default defineComponent({
  name: "AnimationArea",
  components: {
    TalkArea,
  },
  setup() {
    let testAnimation: AngelaAnimation;
    onMounted(() => {
      testAnimation = new AngelaAnimation("animation-area", "talk-area");
    });
    onBeforeUnmount(() => {
      testAnimation.animationDestroy();
    });
  },
});
</script>

<style lang="sass" scoped>
// トーク領域
.talk-area-wrapper
  display: inline-block
  position: absolute
  top: calc(var(--base-pixel) * 2)
  left: calc(var(--base-pixel) * 10 * -1)
</style>
