import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    auth: false,
  },
  getters: {},
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.auth = !!user;
    },
  },
  actions: {
    async logout({ dispatch }) {
      await axios.post("/logout");
      return dispatch("getUser");
    },
    async login({ dispatch }, credentials) {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      return dispatch("getUser");
    },
    getUser({ commit }) {
      axios
        .get("/api/user")
        .then((response) => {
          commit("SET_USER", response.data);
        })
        .catch(() => {
          commit("SET_USER", null);
        });
    },
  },
  modules: {},
});
