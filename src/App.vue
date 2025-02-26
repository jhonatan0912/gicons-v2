<template>
  <div style="display: flex; gap: 1rem">
    <GIcon name="Burger" size="sm" hover active selected />
    <GIcon name="Check" size="sm" hover active selected />
  </div>
</template>

<script>
import GIcon from "./components/GIcon.vue";

export default {
  components: {
    GIcon,
  },
};
</script>
