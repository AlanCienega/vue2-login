<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <template v-if="$store.state.auth">
        <span v-if="$store.state.isImpersonated">
          <span> {{ $store.state.impersonatedUser.name }} </span>
          <button @click="stopImpersonating">Stop impersonation</button>
        </span>
        <span v-else>
          <span> {{ $store.state.user.name }} </span> |
          <button @click="logout">Logout</button>
        </span>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link>
      </template>
    </nav>
    <router-view />
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.dispatch("logout");
      return this.$router.replace("/login");
    },
    stopImpersonating() {
      this.$store.dispatch("stopImpersonating");
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
