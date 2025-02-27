<template>
  <component
    @click.native="$emit('click', $event)"
    v-bind="$attrs"
    :is="icons[name]"
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
    hoverColor: { type: String, default: "--p-secondary-low-shade" },
  },
  computed: {
    icons() {
      return icons;
    },
  },
};
</script>
