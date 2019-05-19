<template>
    <div class="main-header">
        <h1>Kanban</h1>
        <input type="text" placeholder="Input Task" v-model="taskName">
        <input type="text" placeholder="Input Description" v-model="description">
        <input type="submit" @click="sendItem">
    </div>
</template>

<script>

import {database} from '../assets/config.js'

export default {
    name: 'MainHeader',
    data() {
        return {
            taskName: '',
            description: ''
        }
    },
    methods: {
        sendItem() {
            database.collection('kanbanLists').add({
                title: this.taskName,
                description : this.description,
                status: 'prelog'
            })
            this.taskName = ''
        }
    }
}
</script>

<style scoped>
html,
body {
  font-family: 'Roboto';
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
.main-header {
  padding-bottom: 20px
}
.main-header h1 {
  margin-left: auto;
  margin-left: auto;
  text-align: center;
  padding-top: 1.5%;
  font-size: 35px;
}
.main-header i {
  font-size: 20px;
  color: #4684f6;
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