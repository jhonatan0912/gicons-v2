<template>
  <div style="display: flex; flex-direction: column; gap: 1rem">
    <div style="display: flex; gap: 1rem">
      <label for="icon"> Buscar Icono </label>
      <input
        id="icon"
        style="max-width: 200px"
        type="search"
        placeholder="Search"
        @input="onFilter"
      />

      <label>Tamaño</label>
      <select v-model="size">
        <option value="xs">xs</option>
        <option value="sm">sm</option>
        <option value="md">md</option>
        <option value="lg">lg</option>
      </select>

      <label for="color">Color</label>
      <input id="color" type="text" v-model="color" />

      <label for="hover-color">Hover color</label>
      <input id="hover-color" type="text" v-model="hoverColor" />

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
        :size="size"
        :hover="hover"
        :active="active"
        :selected="selected"
        :color="color"
        :hover-color="hoverColor"
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
      color: "red",
      hoverColor: "",
      size: "md",
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
