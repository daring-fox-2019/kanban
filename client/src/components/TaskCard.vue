<template>
  <v-flex class="py-2" sm12>
    <v-card>
      <v-card-title>
        <div>
          <h3 class="headline mb-0">{{ title }}</h3>
          <h6 class="subheading">Point:</h6>
          <p>-</p>
          <h6 class="subheading">PIC:</h6>
          <p>-</p>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-layout row justify-center>
          <v-btn icon flat color="success">
            <v-icon>arrow_back</v-icon>
          </v-btn>
          <v-btn icon flat color="red">
            <v-icon>delete</v-icon>
          </v-btn>
          <v-btn icon flat color="success">
            <v-icon>arrow_forward</v-icon>
          </v-btn>
        </v-layout>
        <v-spacer></v-spacer>
        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
        </v-btn>
      </v-card-actions>
      <v-slide-y-transition>
        <v-card-text v-show="show">
          <h6 class="subheading">Description:</h6>
          <p>-</p>
        </v-card-text>
      </v-slide-y-transition>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'taskCard',
  props: {
    title: String,
  },
  data: () => ({
    show: false,
  }),
};
</script>
