<template>
  <div class="home">
    <animation-test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AnimationTest from "@/components/AnimationTest.vue";

export default defineComponent({
  name: "Home",
  components: {
    AnimationTest,
  },
});
</script>
