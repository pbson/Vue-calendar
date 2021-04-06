<template>
  <v-card
    class="d-flex flex-column elevation-0 rounded-lg"
    min-width="50%"
    color="#385F73"
    dark
  >
    <v-card-title class="headline">
      Calendar 1
    </v-card-title>
    <v-card-subtitle class="align-self-start"
      >Calendar description</v-card-subtitle
    >

    <v-card-actions>
      <SubcribeCalendarDialog />
    </v-card-actions>
  </v-card>
</template>
<style scoped lang="scss">
.v-card {
  background-color: $color-blue-primary !important;
}
</style>
<script>
import SubcribeCalendarDialog from "../components/SubcribeCalendarDialog";

export default {
  components: {
    SubcribeCalendarDialog: SubcribeCalendarDialog,
  },
  data: () => ({}),
};
</script>
