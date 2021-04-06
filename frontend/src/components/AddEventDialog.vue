<template>
  <div justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn v-bind="attrs" v-on="on" class="button elevation-0">
          New event
          <v-icon right dark>
            mdi-cloud-upload
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <h1 class="headline">Add event</h1>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <b></b>
              <h2>Event information</h2>
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-format-title"
                  label="Event Title*"
                  required
                ></v-text-field>
              </v-col>
              <v-row class="pa-3">
                <v-col cols="12" sm="4">
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dates"
                    transition="scale-transition"
                    offset-y
                    min-width="auto"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-combobox
                        v-model="dates"
                        multiple
                        chips
                        small-chips
                        label="Multiple picker in menu"
                        prepend-icon="mdi-calendar"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-combobox>
                    </template>
                    <v-date-picker v-model="dates" multiple no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">
                        Cancel
                      </v-btn>
                      <v-btn
                        text
                        color="primary"
                        @click="$refs.menu.save(dates)"
                      >
                        OK
                      </v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-menu
                    ref="menuFrom"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="timeFrom"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="timeFrom"
                        label="From"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu2"
                      v-model="timeFrom"
                      full-width
                      @click:minute="$refs.menuFrom.save(timeFrom)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
                <v-col cols="12" sm="4">
                  <v-menu
                    ref="menuTo"
                    v-model="menu3"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    :return-value.sync="timeTo"
                    transition="scale-transition"
                    offset-y
                    max-width="290px"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="timeTo"
                        label="To"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-if="menu3"
                      v-model="timeTo"
                      full-width
                      @click:minute="$refs.menuTo.save(timeTo)"
                    ></v-time-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="checkbox"
                  label="Repeat all day "
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-select
                  :items="['Weekly', 'Daily', 'Monthly']"
                  label="Repeat"
                  required
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  prepend-icon="mdi-square-edit-outline"
                  label="Event Description*"
                  required
                ></v-textarea>
              </v-col>
              <!-- <h2>Event attendees</h2> -->
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Add
          </v-btn>
        </v-card-actions>
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
export default {
  data: () => ({
    dates: [],
    menuFrom: false,
    menuTo: false,
    timeFrom: null,
    timeTo: null,
    menu2: false,
    menu3: false,
    modal2: false,
    dialog: false,
  }),
};
</script>
