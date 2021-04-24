<template>
  <transition name="slide-fade">
    <v-col v-if="isSidebarActive" cols="2">
      <v-navigation-drawer class="drawerWrapper" v-model="isSidebarActive">
        <v-row class="buttonWrapper">
          <AddEventDialog />
        </v-row>

        <v-row class="calendarPickerWrapper" justify="center">
          <v-date-picker
            class="calendarPicker"
            v-model="picker"
            color="#059FFD"
            header-color="#059FFD"
          >
          </v-date-picker>
        </v-row>

        <v-row class="calendarListWrapper">
          <h1>Calendar list</h1>
          <AddCalendarDialog />
        </v-row>
        <br />
        <CalendarListItem v-bind:calendarList="calendarList"/>
      </v-navigation-drawer>
    </v-col>
  </transition>
</template>

<style scoped lang="scss">
.drawerWrapper {
  width: 100% !important;
  .buttonWrapper {
    display: flex;
    justify-content: center;
    margin-top: 5px;
  }
}

.calendarPickerWrapper {
  margin-top: 10px !important;
  .calendarPicker {
    margin-top: 15px !important;
  }
}
.calendarListWrapper {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.v-picker__title {
  color: $color-blue-primary !important;
  background-color: white !important;
}

//Fade
.slide-fade-enter-active {
  transition: all 0.2s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}
</style>

<script>
import AddEventDialog from "../components/AddEventDialog";
import AddCalendarDialog from "../components/AddCalendarDialog";
import CalendarListItem from "../components/CalendarListItem";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    AddEventDialog: AddEventDialog,
    AddCalendarDialog: AddCalendarDialog,
    CalendarListItem: CalendarListItem,
  },
  computed: {
    ...mapGetters(["getCalendarList","getSidebarCalendarList"]),
    isSidebarActive() {
      return this.$store.state.isSidebarActive;
    },
    calendarList(){
      return this.getSidebarCalendarList
    }
  },
  watch: {
    calendarList(){
      return this.getSidebarCalendarList
    }
  },
  data() {
    return {
      // drawer: false,
      picker: new Date().toISOString().substr(0, 10),
      items: [
        { title: "Home", icon: "mdi-home-city" },
        { title: "My Account", icon: "mdi-account" },
        { title: "Users", icon: "mdi-account-group-outline" },
      ],
    };
  },
  methods: {
    ...mapActions(['addCalendarList']),
  },
  async created() {
    if (!this.getCalendarList) {
      await this.addCalendarList();
    }
  }
};
</script>
