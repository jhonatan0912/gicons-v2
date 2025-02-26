<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <input
      style="max-width: 200px"
      type="search"
      placeholder="Search"
      @input="onFilter"
    />

    <div style="display: flex; gap: 1rem">
      <GIcon
        v-for="(icon, index) in list"
        :key="index"
        :name="icon"
        size="md"
        hover
      />
    </div>
  </div>
</template>

<script>
import GIcon from "./components/GIcon.vue";
import * as icons from "./icons";

export default {
  components: {
    GIcon,
  },
  data() {
    return {
      list: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.list = Object.keys(icons);
    },
    onFilter(e) {
      const value = e.target.value;

      this.list = Object.keys(icons).filter((icon) =>
        icon.toLowerCase().includes(value.toLowerCase())
      );
    },
  },
};
</script>
