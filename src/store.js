import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
const baseUrl = "https://boiling-fjord-16588.herokuapp.com";

axios.defaults.withCredentials = true;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    mortalityData: ""
  },
  mutations: {
    updateMortalityData(state, status) {
      state.mortalityData = status;
    }
  },
  actions: {
    requestMortalityData({ commit }, region = "TEA") {
      const url = `${baseUrl}/health/mortality/${region}`;

      axios
        .get(url)
        .then(response => {
          commit("updateMortalityData", response.data);
        })
        .catch(err => {
          throw new Error(err);
        });
    }
  }
});
