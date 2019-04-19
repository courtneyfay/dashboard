import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import formats from "./formats";
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faMoneyBill,
  faMedkit,
  faBookReader
} from "@fortawesome/free-solid-svg-icons";

library.add(faMoneyBill, faMedkit, faBookReader);

const formatsPlugin = {
  install() {
    Vue.helpers = formats;
    Vue.prototype.$formats = formats;
  }
};

Vue.use(formatsPlugin);
Vue.use(VueChartkick, { adapter: Chart });

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
