import GIcon from "./components/GIcon.vue";
import GEditor from "./components/GEditor.vue";
import "./styles.css";
import icons from "./icons";

const Plugin = {
  install(Vue) {
    Vue.component("GIcon", GIcon);
    Vue.component("GEditor", GEditor);
  },
};

const names = Object.keys(icons);

export default Plugin;
export { GIcon, GEditor, names };
