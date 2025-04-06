<template>
  <div class="custom__popover" ref="popover">
    <div @click="toggle" class="custom__popover-trigger">
      <slot></slot>
    </div>
    <div class="custom__popover-content" :class="position" v-show="isVisible">
      <slot name="content" :close="close"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popover',
  props: {
    position: {
      type: String,
      default: 'bottom',
    },
  },
  data() {
    return {
      isVisible: false,
    };
  },
  methods: {
    toggle() {
      this.isVisible = !this.isVisible;
    },
    close() {
      this.isVisible = false;
    },
    handleClickOutside(event) {
      if (!this.$refs.popover.contains(event.target)) {
        this.isVisible = false;
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.handleClickOutside);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.handleClickOutside);
  },
};
</script>

<style lang="scss" scoped>
.custom__popover {
  position: relative;
  display: inline-block;

  &-trigger {
    height: 100%;
    cursor: pointer;
    display: flex;
    align-items: center;
  }

  .custom__popover-content {
    display: block;
    position: absolute;
    z-index: 1000;
    white-space: nowrap;
    border-radius: 5px;
    background: #FFFFFF;
    padding-block: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

    &.top {
      bottom: 100%;
      left: 50%;
      transform: translateX(-50%);
    }

    &.bottom {
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
    }

    &.left {
      top: 50%;
      right: 100%;
      transform: translateY(-50%);
    }

    &.right {
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
    }
  }
}
</style>
