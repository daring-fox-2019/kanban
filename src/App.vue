<template>
  <v-app>
    <v-toolbar app color="blue-grey darken-2">
      <v-toolbar-title  class="headline white--text">
        <span text-uppercase>REALTIME KANBAN | </span>
        <span class="font-weight-light">Andre Suchitra</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="white " @click="addForm = true">New Task</v-btn>
    </v-toolbar>
    <v-dialog v-model="addForm" width="500">
      <AddTask v-on:close="addForm = false" :task="newTask" v-on:save="saveTask"></AddTask>
    </v-dialog>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AddTask from '@/components/AddTask.vue'
import db from '@/api/apiFireStore.js'

export default {
  name: 'App',
  components: {
    AddTask,
  },
  data () {
    return {
      addForm: false,
      newTask: {
        title: '',
        description:'',
        point: 0,
        assigned_to: ''
      }
    }
  },
  methods: {
    saveTask() {
      // Add a new document with a generated id.
      let docRef = db.collection("tasks").doc()
      this.newTask.status = 'backlog'
      docRef.set(this.newTask)
      .then(function(docRef) {
      })
      .catch(function(error) {
          console.error("Error adding document: ", error);
      });
    },
  }
}
</script>
