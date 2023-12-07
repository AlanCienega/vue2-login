<template>
  <form @submit.prevent="login">
    <input v-model="form.email" type="email" placeholder="email" />
    <div v-show="errors.email">
      <label v-for="error in errors.email" :key="error"> {{ error }}</label>
    </div>
    <br />
    <input v-model="form.password" type="password" name="password" />
    <div v-show="errors.password">
      <label v-for="error in errors.password" :key="error"> {{ error }}</label>
    </div>
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
    errors: [],
  }),
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", this.form);
        return this.$router.replace("/");
      } catch (e) {
        this.errors = e.response.data.errors;
      }
    },
  },
};
</script>
