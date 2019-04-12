import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import formats from "./formats";
import VueChartkick from "vue-chartkick";
import Chart from "chart.js";

Vue.config.productionTip = false;

const formatsPlugin = {
  install() {
    Vue.helpers = formats;
    Vue.prototype.$formats = formats;
  }
};

Vue.use(formatsPlugin);
Vue.use(VueChartkick, { adapter: Chart });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
