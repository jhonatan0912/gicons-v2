<template>
  <div
    style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem"
  >
    <!-- <div style="display: flex; gap: 0.5rem">
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

      <div style="display: flex; gap: 0.5rem">
        <label for="color">Color</label>
        <input id="color" type="text" v-model="color" />
      </div>

      <div style="display: flex; gap: 0.5rem">
        <label for="hover-color">Hover color</label>
        <input id="hover-color" type="text" v-model="hoverColor" />
      </div>

      <div style="display: flex; gap: 0.5rem">
        <label for="hover">Hover</label>
        <input id="hover" type="checkbox" v-model="hover" />
      </div>
      <div style="display: flex; gap: 0.5rem">
        <label for="active">Active</label>
        <input id="active" type="checkbox" v-model="active" />
      </div>
      <div style="display: flex; gap: 0.5rem">
        <label for="selected">Selected</label>
        <input id="selected" type="checkbox" v-model="selected" />
      </div>
    </div> -->

    <GEditor :value="content" @update:value="content = $event" />
    <p>{{ content }}</p>

    <!-- <div style="display: flex; gap: 2rem; margin-top: 1rem; flex-wrap: wrap">
      <div
        style="
          cursor: pointer;
          box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          align-items: center;
        "
        v-for="(icon, index) in list"
        :key="index"
        @click="oncopy(icon)"
      >
        <GIcon
          :name="icon"
          :size="size"
          :hover="hover"
          :active="active"
          :selected="selected"
          :color="color"
          :hover-color="hoverColor"
        />
        {{ icon }}
      </div>
    </div>

    <div
      id="toast"
      style="
        display: none;
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #333;
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        z-index: 999;
      "
    ></div> -->
  </div>
</template>

<script>
import GIcon from "./components/GIcon.vue";
import GEditor from "./components/GEditor.vue";
import icons from "./icons";

export default {
  components: {
    GIcon,
    GEditor,
  },
  data() {
    return {
      content: "<p>Default Content</p>",
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
      navigator.clipboard.writeText(`<GIcon name="${icon}" />`);
      const toast = document.getElementById("toast");
      toast.textContent = `${icon} copied to clipboard`;
      toast.style.display = "block";

      setTimeout(() => {
        toast.style.display = "none";
      }, 2000);
    },
  },
};
</script>
