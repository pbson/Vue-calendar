<template>
  <div>
    <v-app-bar class="appBar" elevation="0">
      <v-app-bar-nav-icon @click="setIsSidebarActive"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>

      <v-btn @click.native="$router.push('/calendar-search')" icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn @click.native="$router.push('/user-settings')" icon>
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <router-link to="/">Home</router-link>
          <router-link to="/about">About</router-link> |
          <router-link to="/login">Login</router-link> |
          <router-link to="/register">Register</router-link> |
          <router-link v-if="isLoggedIn" to="/calendar">Calendar</router-link> |
          <router-link v-if="isLoggedIn" to="/calendar-settings"
            >Calendar Settings</router-link
          >
          |
          <router-link v-if="isLoggedIn" to="/calendar-search"
            >Calendar Search</router-link
          >
          |
          <router-link v-if="isLoggedIn" to="/user-settings"
            >User Settings</router-link
          >
          |
          <router-link v-if="isLoggedIn" to="/change-password"
            >Change Password</router-link
          >
          |
          <span v-if="isLoggedIn"> | <a @click="logout">Logout</a></span>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>

<style scoped lang="scss">
.appBar {
  background-color: white !important;
  border-bottom: 1px solid $color-bg-secondary !important;
}
</style>

<script>
export default {
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    },
    isSidebarActive() {
      return this.$store.state.isSidebarActive;
    },
  },
  methods: {
    logout: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    },
    setIsSidebarActive: function() {
      this.$store.commit(
        "setIsSidebarActive",
        !this.$store.state.isSidebarActive
      );
    },
  },
  created: function() {
    this.$http.interceptors.response.use(undefined, function(err) {
      return new Promise(function() {
        if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
          this.$store.dispatch("logout");
        }
        throw err;
      });
    });
  },
};
</script>
