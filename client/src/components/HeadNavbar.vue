<template>
  <div>
    <v-toolbar color="orange accent-1">
      <router-link to="/">
        <v-toolbar-title class="brown--text">
          <v-icon color="brown">assignment</v-icon>Kanbandon 2.0
        </v-toolbar-title>
      </router-link>

      <v-spacer></v-spacer>

      <v-btn @click="show=!show" icon>
        <v-icon color="brown">add</v-icon>
      </v-btn>

    </v-toolbar>

    <v-slide-y-transition>
      <v-container v-show="show">
        <v-layout justify-center row>
          <KanbanForm @toggleShow="show=!show"/>
        </v-layout>
      </v-container>
    </v-slide-y-transition>
  </div>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>

<script>
import KanbanForm from '@/components/KanbanForm.vue';

export default {
  name: 'headNavbar',
  components: {
    KanbanForm,
  },
  data() {
    return {
      show: false,
      form: {
        valid: false,
        title: '',
        titleRules: [
          v => !!v || 'Title is required',
        ],
        text: '',
        PIC: '',
        point: 0,
      },
    };
  },
};
</script>
