<template>
  <v-row class="fill-height pt-0 overflow-y-auto">
    <v-col cols="2">
      <div>
        <v-row class="calendarListWrapper">
          <h1>Calendar list</h1>
        </v-row>
        <br />
        <v-list dense>
          <v-list-item
            v-for="item in calendarList"
            :key="item.id"
            @click="getCalendar(item.id)"
          >
            <v-list-item-icon>
              <v-icon :color="item.color">mdi-circle </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>
    </v-col>

    <v-col lg="6" class="pt-0 mt-11">
      <v-sheet height="64">
        <div>
          <v-container>
            <v-row class="d-flex flex-column">
              <v-row>
                <h2>Calendar information</h2>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-format-title"
                    label="Calendar Title*"
                    v-model="title"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    prepend-icon="mdi-square-edit-outline"
                    label="Calendar Description*"
                    v-model="description"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    prepend-icon="mdi-palette"
                    :items="color"
                    item-text="name"
                    v-model="selectColor"
                    item-value="id"
                    label="Color*"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row class="d-flex flex-column">
                <v-row class="pl-2">
                  <v-col cols="6">
                    <v-select
                      prepend-icon="mdi-share"
                      :items="['Public', 'Private']"
                      v-model="selectPrivacy"
                      label="Privacy"
                      required
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-if="selectPrivacy == 'Public'"
                      prepend-icon="mdi-lock"
                      :items="rules"
                      v-model="selectRule"
                      item-text="name"
                      item-value="id"
                      label="Access Rule*"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
              </v-row>
              <!-- 
              <v-row class="justify-start flex-column mb-4">
                <h2 class="align-self-start">Access Rights</h2>
                <v-row class="ml-1">
                  <v-col class="d-flex align-center flex-row" cols="12" sm="6">
                    <v-icon :color="color">mdi-circle </v-icon>
                    <p class="pl-3 mb-0">User A (calendar owner)</p>
                  </v-col>
                </v-row>
                <v-list-item v-for="[color, text] in items" :key="text">
                  <v-row class="ml-1">
                    <v-col
                      class="d-flex align-center flex-row"
                      cols="12"
                      sm="6"
                    >
                      <v-icon :color="color">mdi-circle </v-icon>
                      <p class="pl-3 mb-0">{{ text }}</p>
                    </v-col>
                    <v-col cols="12" sm="6">
                      <v-select :items="rule" label="Right" required></v-select>
                    </v-col>
                  </v-row>
                </v-list-item>
                <v-row class="mt-3 ml-1">
                  <v-btn color="accent" dark>
                    Share to more
                    <v-icon right dark>
                      mdi-share
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-row> -->
              <v-row class="mt-5 justify-start flex-column" v-show="!isPrimary">
                <h2 class="align-self-start">Delete Calendar</h2>
                <p class="align-self-start">
                  Notice: All your calendar will be deleted and can't be recovered
                </p>
                <v-btn color="red" class="ma-2 white--text align-self-start">
                  Delete
                  <v-icon right dark> mdi-trash-can </v-icon>
                </v-btn>
              </v-row>
            </v-row>
          </v-container>
        </div>
      </v-sheet>
    </v-col>
    <v-card-text>
      <v-fab-transition>
        <v-btn
          @click="updateCalendar"
          color="primary"
          class="floatingButton"
          dark
          absolute
          right
          fab
        >
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
    <v-card-text>
      <v-fab-transition>
        <v-btn
          color="primary"
          class="floatingButton"
          dark
          absolute
          top
          right
          @click="updateCalendar"
        >
          Save changes
          <v-icon right dark> mdi-content-save </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      color: [],
      rules: [],
      calendarList: [],
      calendarId: null,
      title: null,
      description: null,
      selectColor: null,
      selectRule: null,
      selectPrivacy: null,
      isPrimary: null,
    };
  },
  computed: {
    ...mapGetters(["getSidebarCalendarList"]),
  },
  methods: {
    ...mapActions(["addCalendarList"]),
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
        return resp.data.data.map(function (elem) {
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
        return resp.data.data.map(function (elem) {
          let obj = {};
          obj["id"] = elem._id;
          obj["name"] = elem.AccessName;
          return obj;
        });
      } catch (error) {
        console.log(error);
      }
    },
    getCalendar: async function (calendarId) {
      const token = localStorage.getItem("token");
      try {
        let resp = await axios({
          url: `http://localhost:3000/calendar-entries/get?id=${calendarId}`,
          method: "GET",
          headers: {
            "auth-token": token,
          },
        });

        this.baseCalendarId = resp.data.data.CalendarId._id;
        this.calendarId = resp.data.data._id;
        this.title = resp.data.data.CalendarId.CalendarTitle;
        this.description = resp.data.data.CalendarId.CalendarDescription;
        this.selectColor = resp.data.data.ColorId._id;
        this.selectRule = resp.data.data.CalendarId.AccessRuleId;
        this.selectPrivacy = resp.data.data.CalendarId.isHidden ? "Private" : "Public";
        this.isPrimary = resp.data.data.isPrimary;
        // console.log(this.baseCalendarId, this.calendarId)
      } catch (error) {
        console.log(error);
      }
    },
    updateCalendar: async function () {
      try {
        const token = localStorage.getItem("token");
        let baseCalendar = {
          id: this.baseCalendarId,
          title: this.title,
          description: this.description,
          accessRuleId: this.selectRule,
          isHidden: this.selectPrivacy == "Public" ? false : true,
        };
        await axios({
          url: "http://localhost:3000/base-calendar/update",
          data: baseCalendar,
          method: "PUT",
          headers: {
            "auth-token": token,
          },
        });
        let calendarEntries = {
          id: this.calendarId,
          colorId: this.selectColor,
          time: this.time,
        };
        await axios({
          url: "http://localhost:3000/calendar-entries/update",
          data: calendarEntries,
          method: "PUT",
          headers: {
            "auth-token": token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  async created() {
    this.color = await this.getColor();
    this.rules = await this.getAccessRules();
    await this.addCalendarList();
    this.calendarList = this.getSidebarCalendarList;
  },
};
</script>

<style scoped lang="scss">
.floatingButton {
  bottom: 0;
  position: absolute;
  margin: 0 0 16px 16px;
}
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
