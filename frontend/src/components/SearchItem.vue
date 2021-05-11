<template>
  <v-card
    class="d-flex flex-column elevation-0 rounded-lg searchResult"
    min-width="50%"
    color="#385F73"
    dark
  >
    <v-card-title class="headline">
      {{ this.title }}
    </v-card-title>
    <v-card-subtitle class="align-self-start">{{ this.owner }}</v-card-subtitle>

    <v-card-actions>
      <div justify="center">
        <v-dialog v-model="dialog" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              class="ml-7 addCalendarButton elevation-0"
              fab
              dark
              @click="getColor()"
            >
              Subcribe
            </v-btn>
          </template>
          <v-card>
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
                      prepend-icon="mdi-format-title"
                      label="Calendar Title*"
                      :value="title"
                      required
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12">
                    <v-textarea
                      prepend-icon="mdi-square-edit-outline"
                      label="Calendar Description*"
                      :value="description"
                      disabled
                      required
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" sm="6">
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
                  <v-col cols="12" sm="6"> </v-col>
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
              <v-btn color="blue darken-1" text @click="addCalendar()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-actions>
  </v-card>
</template>
<style scoped lang="scss">
.searchResult {
  background-color: $color-blue-primary !important;
}
.addCalendarButton {
  width: 40px;
  height: 40px;
  background-color: $color-blue-primary !important;
}
</style>
<script>
import axios from "axios";
import { mapActions } from "vuex";

export default {
  props: ["id", "title", "description", "owner", "rule"],
  data: () => ({
    dialog: false,
    selectColor: null,
    color: [],
    time: "",
  }),
  methods: {
    ...mapActions(["addCalendarList"]),
    getColor: async function() {
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
    addCalendar: async function() {
      try {
        const token = localStorage.getItem("token");
        let calendarEntries = {
          calendarId: this.id,
          colorId: this.selectColor,
          time: this.time,
          isPrimary: false,
        };
        await axios({
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
  async created() {
    this.color = await this.getColor();
  },
};
</script>
