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
      console.log("login");
    },
  },
};
</script>
