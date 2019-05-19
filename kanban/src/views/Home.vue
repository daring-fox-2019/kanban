<template>
  <div>
    <v-layout pa-4 align-start justify-space-around row fill-height>
      <div v-for="panel in panels" :key="panel.text">
        <TaskList :panel="panel"/>
      </div>
    </v-layout>
    <v-layout pa-4 align-start justify-space-around row fill-height>
      <Empty v-if="isEmpty"/>
    </v-layout>
  </div>
</template>

<script>

import TaskList from '@/components/TaskList.vue'
import Empty from '@/components/Empty.vue'
import db from '@/api/firebase.js'

export default {
  components: {
    TaskList,
    Empty
  },
  data () {
    return {
      panels: [
        {
          text: 'Plan',
          color: 'error',
          task: []
        },
        {
          text: 'Todo',
          color: 'warning',
          task: []
        },
        {
          text: 'Ongoing',
          color: 'primary',
          task: []
        },
        {
          text: 'Done',
          color: 'success',
          task: []
        }
      ]
    }
  },
  methods: {
    fetchTasks () {
      db.collection('tasks')
        .onSnapshot((querySnapshot) => {
          this.panels[0].task = []
          this.panels[1].task = []
          this.panels[2].task = []
          this.panels[3].task = []

          querySnapshot.forEach((doc) => {
            const obj = { ...doc.data(), id: doc.id }
            if (obj.status === 'plan') this.panels[0].task.push(obj)
            else if (obj.status === 'todo') this.panels[1].task.push(obj)
            else if (obj.status === 'ongoing') this.panels[2].task.push(obj)
            else if (obj.status === 'done') this.panels[3].task.push(obj)
          })
        })
    }
  },
  created () {
    this.fetchTasks()
  },
  computed: {
    isEmpty () {
      if (
        this.panels[0].task.length === 0 &&
        this.panels[1].task.length === 0 &&
        this.panels[2].task.length === 0 &&
        this.panels[3].task.length === 0
      ) return true
      else return false
    }
  }
}
</script>
