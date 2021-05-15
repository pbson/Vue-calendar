<template>
  <v-row class="fill-height">
    <v-col
      cols="12"
      md="7"
      class="d-flex flex-column align-center justify-center"
    >
      <div class="main text-center">
        <h1 class="mb-10 text-center mt-4">Start using SCal</h1>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          @submit.prevent="register"
          class="text-center"
        >
          <v-text-field
            id="name"
            v-model="name"
            :counter="10"
            :rules="nameRules"
            prepend-icon="face"
            label="Name"
            filled
            rounded
            dense
            required
          ></v-text-field>

          <v-text-field
            id="email"
            prepend-icon="email"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            filled
            rounded
            dense
            required
          ></v-text-field>

          <v-text-field
            type="password"
            id="password"
            prepend-icon="lock"
            :rules="passwordRules"
            v-model="password"
            label="Password"
            filled
            rounded
            dense
            required
          ></v-text-field>

          <v-text-field
            type="password"
            id="password-confirm"
            prepend-icon="lock"
            :rules="passwordConfirmRules"
            v-model="password_confirmation"
            label="Password Confirm"
            filled
            rounded
            dense
            required
          ></v-text-field>

          <v-select
            v-model="selectFaculty"
            :items="faculties"
            item-text="FacultyName"
            item-value="_id"
            prepend-icon="home"
            label="Solo field"
            filled
            rounded
            dense
          ></v-select>
          <v-btn
            class="main__submit-button mt-10"
            elevation="0"
            type="submit"
            color="#059FFD"
          >
            Submit
          </v-btn>
        </v-form>
      </div>
    </v-col>
    <v-col
      cols="12"
      md="5"
      class="d-flex flex-row sidepanel justify-center align-center"
    >
      <div class="sidepanel text-center">
        <h1 class="dark--text sidepanel__main-text">Discover SCal</h1>
        <h2 class="sidepanel__secondary-text">
          Discover the world’s top Designers & Creatives.
        </h2>
        <v-img src="../assets/register.png" max-width="500" max-height="500">
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
        </v-img>
        <div class="text-center mt-12 mb-3">
          <router-link to="/login">
            <v-btn rounded outlined>Sign in</v-btn>
          </router-link>
          <!-- <v-btn rounded outlined>Register</v-btn> -->
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      selectFaculty: "",
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      valid: true,
      faculties: [],
      nameRules: [
        (v) => !!v || "Name is required",
        (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
      ],
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) =>
          (v && v.length >= 6) || "Password must be more than 6 characters",
      ],
      passwordConfirmRules: [
        (v) => !!v || "Password confirmation is required",
        (v) => v == this.password || "Password not match",
      ],
    };
  },
  methods: {
    ...mapActions([
      "addBaseCalendar", //also supports payload `this.nameOfAction(amount)`
    ]),
    sendAddCalendarApi: async function(cal) {
      try {
        const token = localStorage.getItem("token");
        let baseCalendar = {
          title: cal.title,
          description: cal.description,
          events: [],
          accessRuleId: "607429067a1850bd9014fdf9",
          isHidden: true,
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
          colorId: cal.colorId,
          isPrimary: true,
          time: 30,
        };
        await axios({
          url: "http://localhost:3000/calendar-entries/add",
          data: calendarEntries,
          method: "POST",
          headers: {
            "auth-token": token,
          },
        });
      } catch (error) {
        console.log(error);
      }
    },
    addCalendar: function() {
      this.sendAddCalendarApi({
        title: "Main Calendar",
        description: "This is your one and only main calendar",
        colorId: "6071c9d085a2fbbac38d90e6",
      });
      this.sendAddCalendarApi({
        title: "Reminder",
        description: "This is your reminder calendar",
        colorId: "6071ca2185a2fbbac38d90e7",
      });
      this.sendAddCalendarApi({
        title: "Task",
        description: "This is your task calendar",
        colorId: "6071ca3885a2fbbac38d90e8",
      });
    },
    register: async function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
        faculty: this.selectFaculty,
      };
      try {
        await this.$store.dispatch("register", data);
        this.$router.push("/calendar");
        this.addCalendar();
      } catch (error) {
        console.log(error);
      }
      (this.name = ""),
      (this.email = ""),
      (this.password = ""),
      (this.password_confirmation = "");
      (this.faculty = "");
    },
    reset() {
      this.$refs.form.reset();
    },
  },
  created: async function() {
    try {
      let resp = await axios({
        url: "http://localhost:3000/faculty/getall?page=1&limit=20",
        method: "GET",
      });
      this.faculties = resp.data.data;
    } catch (error) {
      console.log(error);
    }
  },
};
</script>
<style scoped lang="scss">
.sidepanel {
  background-color: $color-blue-secondary !important;
  .sidepanel__main-text {
    font-size: 30px;
  }
  .sidepanel__secondary-text {
    font-size: 20px;
    font-weight: 100;
  }
}
.main {
  width: 700px;
  align-items: center;
  .main__submit-button {
    color: white;
    border-radius: 20px;
    font-size: 16px;
    padding: 16px;
    width: 200px;
    border: none;
  }
}
</style>
