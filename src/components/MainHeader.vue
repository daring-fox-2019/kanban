<template>
  <div class="main-header">
    <h1>KanbanTools</h1>
    <!-- <i class="fas fa-plus"></i> -->
    <input type="text" placeholder="Give me a task" v-model="taskName">
    
    <button type="submit" class="btn btn-dark" @click="sendItem" style="margin-left:47%">submit</button>
    <!-- <input type="submit" @click="sendItem"> -->
  </div>
</template>

<script>
import database from '../assets/config.js'
export default {
  name: 'MainHeader',
  data () {
    return {
      taskName: ''
    }
  },
  methods: {
    sendItem () {
      database.ref('/').push({
        title: this.taskName,
        status: 'Pre-Log'
      })
      this.taskName = ''
    }
  }
}
</script>

<style scoped>
html,
body {
  font-family: 'Lato';
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
h1,
h2,
h3 {
  padding: 0;
  margin: 0;
}
.main-header h1 {
  color: #28AFB0;
  margin-left: auto;
  margin-left: auto;
  text-align: center;
  padding-top: 1.5%;
  font-size: 35px;
}
.main-header i {
  font-size: 20px;
  color: #19647e;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 50px;
  cursor: pointer;
}
.main-header input {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
input {
  height: 30px;
  width: 300px;
  margin-bottom: 20px;
  margin-top: 20px;
  border-radius: 5px;
}
</style>