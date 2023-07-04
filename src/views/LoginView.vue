<template>
  <form @submit.prevent="login">
    <input v-model="form.email" type="email" placeholder="email" />
    <br />
    <input v-model="form.password" type="password" name="password" />
    <br />
    <button>Login</button>
  </form>
</template>

<script>
export default {
  data: () => ({
    form: {
      email: "",
      password: "",
    },
  }),
  methods: {
    async login() {
      await this.$store.dispatch("login", this.form);
      return this.$router.replace("/");
    },
  },
};
</script>
