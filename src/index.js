import GIcon from "./components/GIcon.vue";
import "./styles.css";

const Plugin = {
  install(Vue) {
    Vue.component("GIcon", GIcon);
  },
};

export default Plugin;
export { GIcon, names };
