<template>
  <div id="app">
    <link
      href="https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons"
      rel="stylesheet"
    >
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
}
#nav {
  padding-top: 20px;
  padding-right: 50px;
  padding-left: 50px;
  display: flex;
  justify-content: 'flex-between';
}
</style>
