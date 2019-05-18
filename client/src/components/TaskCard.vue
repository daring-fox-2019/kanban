<template>
  <v-card class="my-3">
    <v-card-title>
      <div>
        <h3 class="headline mb-0">{{ dTask.title }}</h3>
        <h6 class="subheading">Point:</h6>
        <p>{{ dTask.point }}</p>
        <h6 class="subheading">PIC:</h6>
        <p>{{ dTask.pic }}</p>
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
        <p>{{ dTask.description }}</p>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
export default {
  name: 'taskCard',
  props: {
    task: Object,
  },
  computed: {
    dTask() {
      return {
        title: this.task.data().title,
        description: this.task.data().description || '-',
        point: this.task.data().point || 0,
        pic: this.task.data().pic || '-',
      };
    },
  },
  data: () => ({
    show: false,
  }),
};
</script>
