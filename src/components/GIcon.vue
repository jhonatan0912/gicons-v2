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
    :style="{
      color: computedColor,
    }"
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
    color: { type: String, default: "--p-text-primary" },
    hoverColor: { type: String, default: "--p-secondary-low-shade" },
  },
  watch: {
    hoverColor(value) {
      if (value) {
        if (this.hoverColor.includes("--")) {
          this.$el.style.setProperty(
            "--hover-color",
            `var(${this.hoverColor})`
          );
        } else {
          this.$el.style.setProperty("--hover-color", this.hoverColor);
        }
      } else {
        this.$el.style.removeProperty("--hover-color");
      }
    },
  },
  computed: {
    icons() {
      return icons;
    },
    computedColor() {
      if (this.color) {
        return this.color.includes("--")
          ? `var(${this.color}) !important`
          : `${this.color} !important`;
      }
      return "";
    },
  },
};
</script>
