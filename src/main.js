import GIcon from "./components/GIcon.vue";
import App from "./App.vue";
import Vue from "vue";
import "./styles.css";

Vue.component("GIcon", GIcon);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
