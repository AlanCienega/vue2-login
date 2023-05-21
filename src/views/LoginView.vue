<template>
  <div>
    <div>Hola {{ user.name }}</div>
    <button v-if="user.email" @click="logout">Logout</button>
    <form v-else @submit.prevent="login">
      <input v-model="form.email" type="email" placeholder="email" />
      <br />
      <input v-model="form.password" type="password" name="password" />
      <br />
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
export default {
  data: () => ({
    user: {},
    form: {
      email: "",
      password: "",
    },
  }),
  created() {
    axios.get("/sanctum/csrf-cookie").then(() => {});
    this.getUSer();
  },
  methods: {
    getUSer() {
      axios.get("/api/user").then((response) => {
        this.user = response.data;
      });
    },
    logout() {
      axios.post("/logout").then(() => {
        this.user = {};
      });
    },
    login() {
      axios.post("/login", this.form).then(() => {
        this.getUSer();
      });
    },
  },
};
</script>
