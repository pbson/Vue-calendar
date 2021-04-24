<template>
  <div justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          class="ml-3 addCalendarButton elevation-0"
          fab
          dark
        >
          <v-icon dark> mdi-plus </v-icon>
        </v-btn>
      </template>
      <v-card>
        <form @submit.prevent="addCalendar">
          <v-card-title>
            <h1 class="headline">Add calendar</h1>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <b></b>
                <h2>Calendar information</h2>
                <v-col cols="12">
                  <v-text-field
                    v-model="title"
                    prepend-icon="mdi-format-title"
                    label="Calendar Title*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="description"
                    prepend-icon="mdi-square-edit-outline"
                    label="Calendar Description*"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-select
                    v-model="selectColor"
                    prepend-icon="mdi-palette"
                    :items="color"
                    item-text="name"
                    item-value="id"
                    label="Color*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="6" sm="6">
                  <v-select
                    v-model="selectRule"
                    prepend-icon="mdi-lock"
                    :items="rules"
                    item-text="name"
                    item-value="id"
                    label="Access Rule*"
                    required
                  ></v-select>
                </v-col>
                <h2>Notifications before</h2>
                <v-row class="pa-3">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      v-model="time"
                      prepend-icon="mdi-alarm"
                      single-line
                      type="number"
                      label="30"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      prepend-icon="mdi-alarm"
                      single-line
                      type="number"
                      label="Minute"
                      disabled
                      required
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" type="submit" text>
              Save
            </v-btn>
          </v-card-actions>
        </form>
      </v-card>
    </v-dialog>
  </div>
</template>
<style scoped lang="scss">
.headline {
  margin-bottom: 20px;
}
.addCalendarButton {
  width: 40px;
  height: 40px;
  background-color: $color-blue-primary !important;
}
</style>
<script>
import axios from "axios";
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      title: null,
      description: null,
      selectColor: null,
      selectRule: null,
      time: null,
      minute: null,
      dialog: false,
      color: [],
      rules: [],
    };
  },
  methods: {
    ...mapActions(['addCalendarList']),
    getColor: async () => {
      try {
        const token = localStorage.getItem("token");
        let resp = await axios({
          url: "http://localhost:3000/color/getall",
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });
        return resp.data.data.map(function(elem) {
          let obj = {};
          obj["id"] = elem._id;
          obj["name"] = elem.CalendarMain;
          return obj;
        });
      } catch (error) {
        console.log(error);
      }
    },
    getAccessRules: async () => {
      try {
        const token = localStorage.getItem("token");
        let resp = await axios({
          url: "http://localhost:3000/access-rule/getall",
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });
        return resp.data.data.map(function(elem) {
          let obj = {};
          obj["id"] = elem._id;
          obj["name"] = elem.AccessName;
          return obj;
        });
      } catch (error) {
        console.log(error);
      }
    },
    addCalendar: async function() {
      try {
        const token = localStorage.getItem("token");
        let baseCalendar = {
          title: this.title,
          description: this.description,
          events: [],
        };
        let resp = await axios({
          url: "http://localhost:3000/base-calendar/add",
          data: baseCalendar,
          method: "POST",
          headers: {
            "auth-token": token,
          },
        });
        let calendarEntries = {
          calendarId: resp.data.data._id,
          accessRuleId: this.selectRule,
          colorId: this.selectColor,
          time: this.time,
          isHidden: false,
          isPrimary: false,
        };
        resp = await axios({
          url: "http://localhost:3000/calendar-entries/add",
          data: calendarEntries,
          method: "POST",
          headers: {
            "auth-token": token,
          },
        });
this.addCalendarList();
        this.dialog = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
  async mounted() {
    this.color = await this.getColor();
    this.rules = await this.getAccessRules();
  },
};
</script>
