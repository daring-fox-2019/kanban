<template>
  <div id="app">
    <div  style="background-color:#f6f4f7 !important">
      <b-container>
        <Navbar/>
      </b-container>
    </div>
    <!-- <div id="nav">
      <router-link to="/">Board</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    Navbar,
  },
};
</script>
