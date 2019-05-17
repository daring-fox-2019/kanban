<template>
  <div>
    <v-layout align-flex-start justify-space-around row fill-height pa-3 wrap>
      <v-flex xs12 sm6 md3 lg3 px-2>
        <Category status="BACKLOG" :tasks="backlog"></Category>
      </v-flex>
      <v-flex xs12 sm6 md3 lg3 px-2>
        <Category status="TODO" :tasks="todo"></Category>
      </v-flex>
      <v-flex xs12 sm6 md3 lg3 px-2>
        <Category status="DOING" :tasks="doing"></Category>
      </v-flex>
      <v-flex xs12 sm6 md3 lg3 px-2>
        <Category status="DONE" :tasks="done"></Category>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Category from '@/components/Category.vue'
import Task from '@/components/Task.vue'
import db from '@/api/apiFireStore.js'

export default {
  components: {
    Category,
  },
  data() {
    return {
      taskDetail: false,
      backlog: [],
      doing: [],
      todo: [],
      done: [],
      newTask: {
        title: '',
        description:'',
        point: 0,
        assigned_to: ''
      }
    }
  },
  created() {
      db.collection("tasks")
        .onSnapshot((querySnapshot) => {
            this.backlog = []
            this.todo = []
            this.done = []
            this.doing = []
            querySnapshot.forEach((doc) => {
                let task = doc.data()
                task.id = doc.id
                switch(task.status) {
                  case 'todo':
                    this.todo.push(task)
                    break;
                  case 'doing':
                    this.doing.push(task)
                    break;
                  case 'done':
                    this.done.push(task)
                    break;
                  case 'backlog':
                  default:
                    this.backlog.push(task)
                    break;
                }
            });
        });
  },
  methods: {
    saveTask() {
      // Add a new document with a generated id.
      let docRef = db.collection("tasks").doc()
      docRef.set(this.newTask)
      .then(function(docRef) {
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    },
  }
};
</script>
