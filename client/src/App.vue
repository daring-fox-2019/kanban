<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  created() {},
  data() {
    return {};
  }
};
</script>
<style>
#app {
  background: url("https://images.unsplash.com/photo-1558120343-2d140d454594?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80");
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
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
