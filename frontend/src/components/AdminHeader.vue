<template>
  <div>
    <v-app-bar class="appBar" elevation="0">
      <v-app-bar-nav-icon @click.native="$router.go(-1)">
        <v-icon color="white">mdi-keyboard-backspace</v-icon>
      </v-app-bar-nav-icon>
      <v-title class="title">Calendar Admin</v-title>
    </v-app-bar>
  </div>
</template>

<style scoped lang="scss">
.appBar {
  background-color: #536dfe !important;
  border-bottom: 1px solid rgb(204, 204, 204) !important;
}
.title{
    color: white
}
</style>
