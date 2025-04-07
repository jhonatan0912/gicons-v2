<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 1rem">
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

    <GEditor ref="editor" :value="content" @update:value="content = $event" />
    <p>{{ content }}</p>

    <button @click="$refs.editor.clear()">Destroy</button>

    <button @click="onSetContent">Set new Content</button>

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
      content: "",
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

    onSetContent() {
      this.$refs.editor.setContent(`<img class="resizable-image" src="data:image/webp;base64,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" alt="Sample-Webp-File-for-Testing (1).webp" title="TEST">
`);
    }
  },
};
</script>
