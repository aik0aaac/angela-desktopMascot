<template>
  <div class="home">
    <HelloWorld />
    <animation-test />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /sr
import AnimationTest from "@/components/AnimationTest.vue";

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
    AnimationTest,
  },
});
</script>
