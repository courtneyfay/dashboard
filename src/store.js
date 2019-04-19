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
    updateMortalityData(state, data) {
      state.mortalityData = data;
    }
  },
  actions: {
    async requestMortalityData({ commit }, region = "TEA") {
      const url = `${baseUrl}/health/mortality/${region}`;

      try {
        const response = await axios.get(url);

        commit("updateMortalityData", response.data);
      } catch (err) {
        throw new Error(err);
      }
    }
  }
});
