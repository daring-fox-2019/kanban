<template>
  <div id="app">
    <div id="nav">
    </div>
    <router-view/>
    <div style="height: 60px;"></div>
  </div>
</template>

<style>
#app {
  font-family: 'Roboto Slab', serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
