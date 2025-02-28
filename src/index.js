import GIcon from "./components/GIcon.vue";
import icons from "./icons";
import "./styles.css";

const Plugin = {
  install(Vue) {
    Vue.component("GIcon", GIcon);
  },
};

console.log(Object.keys(icons));

export default Plugin;
export { GIcon, icons };
