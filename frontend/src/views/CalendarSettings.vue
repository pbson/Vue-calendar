<template>
  <v-row class="fill-height pt-0 overflow-y-auto">
    <EditCalendarSidebar />
    <v-col lg="6" class="pt-0">
      <v-sheet height="64">
        <h2>Settings for calendar</h2>
        <div>
          <v-container>
            <v-row class="d-flex flex-column">
              <b></b>
              <v-row>
                <h2>Calendar information</h2>
                <v-col cols="12">
                  <v-text-field
                    prepend-icon="mdi-format-title"
                    label="Calendar Title*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    prepend-icon="mdi-square-edit-outline"
                    label="Calendar Description*"
                    required
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    prepend-icon="mdi-palette"
                    :items="['0-17', '18-29', '30-54', '54+']"
                    label="Color*"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    prepend-icon="mdi-lock"
                    :items="['Public', 'Private']"
                    label="Access Rule*"
                    required
                  ></v-select>
                </v-col>
              </v-row>

              <v-row class="d-flex flex-column">
                <h2 class="align-self-start">Share your calendar</h2>
                <v-col cols="6">
                  <v-select
                    prepend-icon="mdi-share"
                    :items="['Public', 'Private']"
                    label="Right"
                    required
                  ></v-select>
                </v-col>
              </v-row>

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
                      <v-select
                        :items="['Only see', 'See and Edit']"
                        label="Right"
                        required
                      ></v-select>
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
              </v-row>

              <v-row class="justify-start flex-column">
                <h2 class="align-self-start">Notifications before</h2>
                <v-row class="pa-3">
                  <v-col cols="12" sm="6">
                    <v-text-field
                      prepend-icon="mdi-alarm"
                      single-line
                      type="number"
                      label="30"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      :items="['Minute', 'Hour']"
                      label="Minute/Hour"
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-row class="mt-1 mb-4 ml-1">
                  <v-btn color="accent" dark>
                    Add more notification
                    <v-icon right dark>
                      mdi-bell
                    </v-icon>
                  </v-btn>
                </v-row>
              </v-row>

              <v-row class="mt-5 justify-start flex-column">
                <h2 class="align-self-start">Delete Calendar</h2>
                <p class="align-self-start">
                  Notice: All your calendar will be deleted and can't be
                  recovered
                </p>
                <v-btn color="red" class="ma-2 white--text align-self-start">
                  Delete
                  <v-icon right dark>
                    mdi-trash-can
                  </v-icon>
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
          v-show="!hidden"
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
          v-show="!hidden"
          color="primary"
          class="floatingButton"
          dark
          absolute
          top
          right
        >
          Save changes
          <v-icon right dark>
            mdi-content-save
          </v-icon>
        </v-btn>
      </v-fab-transition>
    </v-card-text>
  </v-row>
</template>

<script>
import EditCalendarSidebar from "../components/EditCalendarSidebar";

export default {
  components: {
    EditCalendarSidebar: EditCalendarSidebar,
  },
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
