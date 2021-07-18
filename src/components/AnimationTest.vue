<template>
  <div class="wrapper"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { animationPlay } from "@/animation";

export default defineComponent({
  name: "AnimationTest",
  components: {},
  setup() {
    onMounted(() => {
      animationPlay();
    });
  },
});
</script>

<style scoped lang="scss"></style>
