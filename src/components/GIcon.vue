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
<style>
.g-icon {
  cursor: pointer;
  border-radius: 5px;

  /* states */
  &.hover:hover {
    background-color: #f5f5f5;
  }
  &.active {
    background-color: #efefef;
  }
  &.selected {
    background-color: #eeeeee;
  }

  /* sizes */
  &.xs {
    width: 14px;
    height: 14px;
    padding: 3px;
  }
  &.sm {
    width: 16px;
    height: 16px;
    padding: 4px;
  }
  &.md {
    width: 18px;
    height: 18px;
    padding: 5px;
  }
  &.lg {
    width: 24px;
    height: 24px;
    padding: 4px;
  }
}
</style>
