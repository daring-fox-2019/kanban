<template>
  <div id="app">
    <div id="nav">

      <div>
        <b-navbar id="navbar" toggleable type="dark" variant="dark">
          <div>
            <b-navbar-toggle target="nav-text-collapse"></b-navbar-toggle>
              <AddTask />
          </div>
          <b-navbar-brand>Qanban</b-navbar-brand>

          <b-collapse id="nav-text-collapse" is-nav>
            <b-navbar-nav>
              <b-nav-text>Get yourself more organized with Qanban!</b-nav-text>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar>
      </div>
      <br><br>
      <b-container class='bv-example-row w-100'>
        <b-row align-h="center">
          <b-col lg="3" sm="12">
            <Category bgcolor="red" category="Back Log">
              <Task v-for="list in backLog" :key="list.data.id" :todoname="list.data.todoname"
                :priority="list.data.priority" :assignedto="list.data.assignedto" :detil="list">
              </Task>
            </Category>
          </b-col>

          <b-col lg="3" sm="12">
            <Category bgcolor="yellow" category="To Do">
              <Task v-for="list in listTodo" :key="list.data.id" :todoname="list.data.todoname"
                :priority="list.data.priority" :assignedto="list.data.assignedto" :detil="list">
              </Task>
            </Category>
          </b-col>

          <b-col lg="3" sm="12">
            <Category bgcolor="green" category="Doing">
              <Task v-for="list in doing" :key="list.data.id" :todoname="list.data.todoname"
                :priority="list.data.priority" :assignedto="list.data.assignedto" :detil="list">
              </Task>
            </Category>
          </b-col>

          <b-col lg="3" sm="12">
            <Category bgcolor="aqua" category="Done">
              <Task v-for="list in done" :key="list.data.id" :todoname="list.data.todoname"
                :priority="list.data.priority" :assignedto="list.data.assignedto" :detil="list">
              </Task>
            </Category>
          </b-col>
        </b-row>
      </b-container>
      <br><br>
    </div>

  </div>
</template>

<style scoped>
  .container {
    margin: auto;
    max-width: 1600px;
  }

  #app {
    background-image: url('../public/1.png');
    /* background-repeat: no-repeat; */
    background-attachment: fixed;
    background-position: center;
  }

</style>

<script>
import Task from '@/components/Task.vue';
import Category from '@/components/Category.vue';
import axios from 'axios';
import AddTask from '@/components/AddTask.vue';
import db from '@/api/firebase';

// const Swal = require('sweetalert2')

export default {
  components: {
    Task,
    Category,
    AddTask,
  },
  methods: {

  },
  data() {
    return {
      listTodo: [],
      backLog: [],
      doing: [],
      done: [],
    };
  },
  created() {
    db.collection('tasks').orderBy('createdAt', 'desc')
      .onSnapshot((querySnapshot) => {
        console.log('terupdatee');
        this.backLog = [];
        this.listTodo = [];
        this.doing = [];
        this.done = [];
        querySnapshot.forEach((doc) => {
          switch (doc.data().status) {
            case 'Back Log':
              doc.data().id = doc.id;
              this.backLog.push({
                data: doc.data(),
                id: doc.id,
              });
              break;
            case 'To Do':
              this.listTodo.push({
                data: doc.data(),
                id: doc.id,
              });
              break;
            case 'Doing':
              this.doing.push({
                data: doc.data(),
                id: doc.id,
              });
              break;
            case 'Done':
              this.done.push({
                data: doc.data(),
                id: doc.id,
              });
              break;
          }
        });
      });
  },
};

</script>
