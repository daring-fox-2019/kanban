<template>
  <v-layout  >
    <v-toolbar fixed mb-5 flat >
      <v-toolbar-title class="text-uppercase display-1 indigo--text">KBN</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items >
        <v-layout row justify-center>
          <v-dialog v-model="dialog" persistent max-width="600px">
            <!-- activate modal -->
            <template v-slot:activator="{ on }">
              <v-btn flat color="indigo" small ripple v-on="on">
                <v-icon small>add</v-icon>Add Task
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline center">Add a New Task</span>
              </v-card-title>

              <v-card-text>
                <!-- Form -->
                <form id="add-task" @submit.prevent= "addTask">
                  <v-text-field v-model="title" label="Task" required></v-text-field>
                  <v-text-field v-model="assigned" label="Assigned" required></v-text-field>
                  <v-text-field v-model="point" label="Point" type="number" min="1" ></v-text-field>
                  <v-textarea v-model="detail" label="Detail" no-resize></v-textarea>
                </form>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red darken-1" flat @click="closeForm">Cancel</v-btn>
                <v-btn color="blue darken-1" flat type="submit" form="add-task">Add</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-layout>
      </v-toolbar-items>
    </v-toolbar>

    <v-layout row wrap mt-5 pt-5 id="list-column">
      <List :process="'backlog'" :tasks="backlog" :statId="1" />
      <List :process="'todo'" :tasks="todo" :statId="2"  />
      <List :process="'doing'" :tasks="doing" :statId="3"  />
      <List :process="'done'" :tasks="done" :statId="4"  />
    </v-layout>
  </v-layout>
</template>

<script>
import alertify from 'alertifyjs';
import List from '@/components/List.vue';
import firebase from '../database/firebase';

const dbRef = firebase.collection('tasks');

export default {
  name: 'Home',
  components: {
    List,
  },
  data() {
    return {
      dialog: false,
      newTask: {},
      title: '',
      assigned: '',
      point: '',
      detail: '',
      status: 1,
      tasksList: [],
      backlog: [],
      todo: [],
      doing: [],
      done: [],
    };
  },
  created() {
    this.getTasks();
  },

  methods: {

    getTasks() {
      dbRef
        .onSnapshot((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const eachTask = Object.assign({ id: doc.id }, doc.data());

            this.tasksList.push(eachTask);
          });

          this.backlog = [];
          this.todo = [];
          this.doing = [];
          this.done = [];

          this.tasksList.forEach((v) => {
            switch (v.status) {
              case 1:
                this.backlog.push(v);
                break;
              case 2:
                this.todo.push(v);
                break;
              case 3:
                this.doing.push(v);
                break;
              case 4:
                this.done.push(v);
                break;
              default:
                break;
            }
          });
          this.tasksList = [];
        });
    },
    addTask() {
      this.dialog = false;
      this.newTask = {
        title: this.title,
        assigned: this.assigned,
        point: this.point,
        detail: this.detail,
        status: this.status,
      };

      dbRef
        .add(this.newTask)
        .then(() => {
          this.newTask = {};
          this.title = '';
          this.assigned = '';
          this.point = '';
          this.detail = '';
          alertify.success('Task added!');
        })
        .catch((err) => {
          console.log(err);
        });
    },

    closeForm() {
      this.title = '';
      this.assigned = '';
      this.point = '';
      this.detail = '';
      this.dialog = false;
    },
  },
};
</script>

<style>
.v-toolbar__content > *:first-child{
  cursor: default;
}
</style>
