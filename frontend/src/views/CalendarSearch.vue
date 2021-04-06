<template>
  <v-row class="fill-height pt-0 overflow-y-auto">
    <v-col class="mt-3 ml-3" cols="2">
      <h2>Change search keywords</h2>
      <v-form>
        <v-text-field label="User's email"> </v-text-field>
        <v-text-field label="User's calendar"></v-text-field>
        <v-btn>
          Search
        </v-btn>
      </v-form>
    </v-col>
    <v-col lg="6" class="pt-0">
      <v-sheet class="d-flex flex-column ml-6 mt-6" height="64">
        <h2 class="align-self-start">Search result</h2>
        <v-row class="mt-4">
          <v-col class="d-flex align-center flex-row" cols="12" sm="6">
            <v-icon :color="color">mdi-circle </v-icon>
            <p class="pl-3 mb-0">User A (calendar owner)</p>
          </v-col>
        </v-row>
        <v-row class="mt-4">
          <SearchItem />
        </v-row>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
import SearchItem from "../components/SearchItem";

export default {
  components: {
    SearchItem: SearchItem
  },
  data() {
    return {
      items: [
        ["red", "Inbox"],
        ["blue", "Send"],
        ["green", "Trash"],
        ["yellow", "Spam"],
      ],
    };
  },
};
</script>

<style scoped lang="scss">
.floatingButton {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
</style>
