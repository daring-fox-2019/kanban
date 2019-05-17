<template>
  <div id="app">
    <v-app>
      <HeadNavbar/>
      <router-view/>
    </v-app>
  </div>
</template>

<style scoped>
  div #app {
    background: yellow;
    background-image: url("./assets/background.jpeg");
    background-attachment: fixed;
    background-position: bottom;
  }
</style>

<script>
import HeadNavbar from '@/components/HeadNavbar.vue';

export default {
  name: 'app',
  components: {
    HeadNavbar,
  },
};
</script>
