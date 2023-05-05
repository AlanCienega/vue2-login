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
      axios.post("http://localhost:8000/login").then((response) => {
        console.log(response);
      });
    },
  },
};
</script>
