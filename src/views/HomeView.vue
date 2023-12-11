<template>
  <div class="home">
    <img alt="Vue logo" width="100px" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <ul>
      <li v-for="user in $store.state.users" :key="user.id">
        <span>
          {{ user.name }}
        </span>
        <button
          :disabled="isButtonDisabled(user)"
          @click="impersonate(user.id)"
        >
          impersonate
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
  mounted() {
    this.$store.dispatch("fetchUsers");
  },
  computed: {
    isButtonDisabled() {
      return (user) => {
        return (
          user.id === this.$store.state.user.id ||
          this.$store.state.isImpersonated
        );
      };
    },
  },
  methods: {
    impersonate(user_id) {
      this.$store.dispatch("impersonateUser", user_id);
    },
  },
};
</script>
