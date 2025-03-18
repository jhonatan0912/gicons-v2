import GIcon from "./components/GIcon.vue";
import "./styles.css";
import icons from "./icons";

const Plugin = {
  install(Vue) {
    Vue.component("GIcon", GIcon);
  },
};

const names = Object.keys(icons);
export default Plugin;
export { GIcon, names };
