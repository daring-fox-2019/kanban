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
      <v-card-text v-show="show">
        <h6 class="subheading">Description:</h6>
        <p>-</p>
      </v-card-text>
    </v-slide-y-transition>
  </div>
</template>

<style scoped>
  a {
    text-decoration: none;
  }
</style>

<script>
export default {
  name: 'headNavbar',
  data() {
    return {
      show: false,
    };
  },
};
</script>
