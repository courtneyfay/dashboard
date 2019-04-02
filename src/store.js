import Vue from "vue";
import Vuex from "vuex";
//import axios from 'axios';
//axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    data: ""
  },
  mutations: {},
  actions: {
    requestBigQueryData() {
      const response = "got the data!";
      this.state.data = response;
    }
  }
});
