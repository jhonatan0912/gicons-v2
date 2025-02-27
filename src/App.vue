<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <div style="display: flex; gap: 1rem">
      <input
        style="max-width: 200px"
        type="search"
        placeholder="Search"
        @input="onFilter"
      />

      <div>
        <label for="hover">Hover</label>
        <input id="hover" type="checkbox" v-model="hover" />
      </div>
      <div>
        <label for="active">Active</label>
        <input id="active" type="checkbox" v-model="active" />
      </div>
      <div>
        <label for="selected">Selected</label>
        <input id="selected" type="checkbox" v-model="selected" />
      </div>
    </div>

    <div style="display: flex; gap: 1rem; margin-top: 1rem">
      <GIcon
        v-for="(icon, index) in list"
        @click="oncopy(icon)"
        :key="index"
        :name="icon"
        size="md"
        :hover="hover"
        :active="active"
        :selected="selected"
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
      hover: false,
      active: false,
      selected: false,
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
    oncopy(icon) {
      navigator.clipboard.writeText(icon);
    },
  },
};
</script>
