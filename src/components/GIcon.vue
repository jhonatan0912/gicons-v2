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
    :style="styleObject"
  ></component>
</template>
<script>
import icons from "../icons";

export default {
  name: "GIcon",
  props: {
    name: { type: String, required: true },
    size: { type: String, default: "md" },
    hover: { type: Boolean, default: false },
    active: { type: Boolean, default: false },
    selected: { type: Boolean, default: false },
    color: { type: String, default: "--p-text-primary" },
    hoverColor: { type: String, default: "--p-secondary-low-shade" },
    rotate: { type: Number, default: 0 },
  },
  data: () => ({ icons }),
  computed: {
    styleObject() {
      return {
        color: this.color.includes("--") ? `var(${this.color})` : this.color,
        transform: this.rotate ? `rotate(${this.rotate}deg)` : null,
        "--hover-color": this.hoverColor.includes("--")
          ? `var(${this.hoverColor})`
          : this.hoverColor,
      };
    },
  },
};
</script>
