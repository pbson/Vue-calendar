<template>
  <v-list dense>
    <v-list-item
      class="calendarListWrapper mt-0"
      v-for="item in items"
      :key="item.title"
    >
      <v-checkbox
      class="ma-0"
        v-model="ex4"
        label="What"
        color="red"
        value="red"
        hide-details
      ></v-checkbox>
      <v-btn class="calendarSettings" icon>
        <v-icon @click.native="$router.push('/calendar-settings')" dark>
          mdi-dots-vertical
        </v-icon>
      </v-btn>
    </v-list-item>
  </v-list>
</template>

<style scoped lang="scss">
.calendarListWrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.calendarSettings{
  margin-left: auto;
}
</style>

<script>
export default {
  computed: {},
  data() {
    return {
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
};
</script>
