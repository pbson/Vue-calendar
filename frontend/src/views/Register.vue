<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="8" md="8">
      <v-card class="elevation-12">
        <v-row class="fill-height">
          <v-col cols="12" md="4" class="teal accent-3">
            <v-card-text class="dark--text mt-12">
              <h1 class="text-center display-1">Welcome Back!</h1>
              <h5 class="text-center">
                To Keep connected with us please login with your personnel info
              </h5>
            </v-card-text>
            <v-img
              src="../assets/Mobile login-rafiki.svg"
              max-width="500"
              max-height="300"
            >
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
              <v-btn rounded outlined light>Sign in</v-btn>
            </div>
          </v-col>
          <v-col cols="12" md="8">
            <v-card-text class="mt-12">
              <h1 class="text-center display-2 teal--text text--accent-3">
                Create Account
              </h1>
              <h4 class="text-center mt-4">
                Ensure your email for registration
              </h4>
              <v-form
                ref="form"
                v-model="valid"
                lazy-validation
                @submit.prevent="register"
              >
                <v-text-field
                  id="name"
                  v-model="name"
                  :counter="10"
                  :rules="nameRules"
                  prepend-icon="face"
                  label="Name"
                  required
                ></v-text-field>

                <v-text-field
                  id="email"
                  prepend-icon="email"
                  v-model="email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  id="password"
                  prepend-icon="lock"
                  :rules="passwordRules"
                  v-model="password"
                  label="Password"
                  required
                ></v-text-field>

                <v-text-field
                  type="password"
                  id="password-confirm"
                  prepend-icon="lock"
                  :rules="passwordConfirmRules"
                  v-model="password_confirmation"
                  label="Password Confirm"
                  required
                ></v-text-field>
                <v-btn
                  type="submit"
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                >
                  Submit
                </v-btn>
                <v-btn color="error" class="mr-4 red" @click="reset">
                  Reset Form
                </v-btn>
              </v-form>
            </v-card-text>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      valid: true,
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
    register: function() {
      let data = {
        name: this.name,
        email: this.email,
        password: this.password,
      };
      console.log(data);
      this.$store
        .dispatch("register", data)
        .then(() => this.$router.push("/"))
        .catch((err) => console.log(err));
      (this.name = ""),
        (this.email = ""),
        (this.password = ""),
        (this.password_confirmation = "");
    },
    reset() {
      this.$refs.form.reset();
    },
  },
};
</script>
