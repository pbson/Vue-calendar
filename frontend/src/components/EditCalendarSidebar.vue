<template>
  <v-col cols="2">
    <div>
      <v-row class="calendarListWrapper">
        <h1>Calendar list</h1>
      </v-row>
      <br />
      <v-list dense>
        <v-list-item
          v-for="[color,text] in items"
          :key="text"
          link
        >
          <v-list-item-icon>
            <v-icon :color=color >mdi-circle </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </div>
  </v-col>
</template>

<style scoped lang="scss">
.drawerWrapper {
  width: 100% !important;
}
.calendarPickerWrapper {
  margin-top: 10px !important;
}
.calendarListWrapper {
  margin-top: 20px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  h1 {
    font-size: 25px;
    color: black;
  }
}
</style>

<script>
export default {
  data() {
    return {
      items: [
        ['red','Inbox'],
        ['blue','Send'],
        ['green', 'Trash'],
        ['yellow','Spam'],
      ],
    };
  },
};
</script>
