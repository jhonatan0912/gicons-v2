<template>
  <component
    :is="icons[name]"
    v-bind="$attrs"
    :class="[
      size,
      {
        hover: hover,
        active: active,
        selected: selected,
      },
    ]"
  ></component>
</template>
<script>
import * as icons from "../icons";

export default {
  name: "GIcon",
  props: {
    name: { type: String, required: true },
    size: { type: String, default: "md" },
    hover: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
  },
  computed: {
    icons() {
      return icons;
    },
  },
};
</script>
