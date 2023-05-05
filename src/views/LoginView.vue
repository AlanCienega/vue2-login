<template>
  <div>
    <pre>
      {{ user }}
    </pre>
    <form @submit.prevent="login">
      <input v-model="form.email" type="email" placeholder="email" />
      <br />
      <input type="password" name="password" />
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
  methods: {
    login() {
      axios.get("/sanctum/csrf-cookie").then(() => {
        axios.post("/login", this.form).then((response) => {
          console.log(response);
        });
      });
    },
  },
};
</script>
