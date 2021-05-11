<template>
  <v-row class="fill-height mt-5 pt-0 overflow-y-auto">
    <v-col cols="2">
      <h2>Select settings</h2>
      <v-list dense>
        <v-list-item link @click.native="$router.push('/user-settings')">
          <v-list-item-content>
            <v-list-item-title>User basic informations</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title>Change password</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col lg="6" class="mt-5 pt-0">
      <v-sheet height="64">
        <h2>Change password</h2>
        <div>
          <v-container>
            <v-row class="d-flex flex-column">
              <b></b>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-form-textbox-password"
                    label="Old password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-key "
                    label="New password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-key "
                    label="Retype new password"
                    type="password"
                    required
                  ></v-text-field>
                </v-col>
                <v-btn
                  color="primary"
                  class="align-self-start ma-2 white--text"
                >
                  Save
                  <v-icon right dark>
                    mdi-content-save
                  </v-icon>
                </v-btn>
              </v-row>
            </v-row>
          </v-container>
        </div>
      </v-sheet>
    </v-col>
  </v-row>
</template>

<script>
export default {
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
