import axios from "axios";
import Vue from "vue";
import Vuex from "vuex";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    auth: false,
    impersonatedUser: null,
    isImpersonated: false,
    users: [],
  },
  getters: {
    fetchUser: (state) => state.user,
    isAuthenticated: (state) => state.auth,
    fetchImpersonatedUser: (state) => state.impersonatedUser,
    isImpersonating: (state) => state.isImpersonated,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
      state.auth = !!user;
    },
    SET_IMPERSONATED_USER(state, user) {
      state.impersonatedUser = user;
      state.isImpersonated = !!user;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async logout({ dispatch }) {
      await axios.post("/logout");
      dispatch("fetchUser");
      dispatch("fetchUsers");
    },
    async login({ dispatch }, credentials) {
      await axios.get("/sanctum/csrf-cookie");
      await axios.post("/login", credentials);
      dispatch("fetchUser");
    },
    async fetchUser({ commit }) {
      try {
        const response = await axios.get("/api/user");
        return commit("SET_USER", response.data);
      } catch (error) {
        return commit("SET_USER", null);
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get("api/users");
        return commit("SET_USERS", response.data);
      } catch {
        return commit("SET_USERS", []);
      }
    },
    async impersonateUser({ commit }, userId) {
      const response = await axios.post(`api/impersonate/${userId}`);
      commit("SET_IMPERSONATED_USER", response.data.user);
    },

    async stopImpersonating({ commit, state }) {
      await axios.post(`api/stop-impersonating/${state.impersonatedUser.id}`);
      commit("SET_IMPERSONATED_USER", null);
    },
  },
  modules: {},
});
