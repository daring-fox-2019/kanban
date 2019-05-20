<template>
  <div id="app" class="has-background-white pt32">
    <div class="container">
      <div class="columns is-gapless">
        <div
          class="column is-3"
          v-for="(status, index) in taskStatus"
          :key="index">
          <p class="is-size-4 is-uppercase has-text-weight-bold has-text-centered">{{ status.text }}</p>
          <div
            class="is-divider mt8 mb32"
            :class="status.color">
          </div>
          <div class="tile is-anchestor">
            <div class="tile is-parent is-vertical">
              <div>
                <b-button
                  class="mb24 is-radiusless is-fullwidth has-text-weight-bold"
                  icon-left="plus"
                  type="is-primary"
                  v-if="isBacklog(status)"
                  @click="handleClickNewTask">New Task</b-button>
              </div>
              <TaskList
                :tasks="filterTasksByStatus(status.value)"
                :next-status="getNextStatus(status)"
                :prev-status="getPrevStatus(status)"
                @click-delete-task="handleClickDeleteTask"
                @click-update-status="handleClickUpdateStatus"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal :active.sync="showCreateTaskModal" has-modal-card>
      <CreateTask />
    </b-modal>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

import db from './api/firestore'
import TaskList from './components/TaskList.vue'
import CreateTask from './components/CreateTask.vue'

export default {
  name: 'App',
  components: {
    CreateTask,
    TaskList
  },
  data: function () {
    return {
      showCreateTaskModal: false,
      tasks: [],
      taskStatus: [{
        text: 'back-log',
        value: 'backlog',
        color: 'is-danger'
      }, {
        text: 'to-do',
        value: 'todo',
        color: 'is-warning'
      }, {
        text: 'doing',
        value: 'doing',
        color: 'is-info'
      }, {
        text: 'done',
        value: 'done',
        color: 'is-success'
      }]
    }
  },
  created: function () {
    db
      .collection('tasks')
      .orderBy('updated_at', 'desc')
      .onSnapshot((querySnapshot) => {
        this.tasks = []
        querySnapshot.forEach((doc) => {
          this.tasks.push({
            id: doc.id,
            ...doc.data()
          })
        })
      })
  },
  methods: {
    handleClickUpdateStatus: function ({ task, status: { value } }) {
      db
        .collection('tasks')
        .doc(task.id)
        .set({
          status: value,
          updated_at: new Date
        }, { merge: true })
        .then()
        .catch(err => console.log(err))
    },
    handleClickDeleteTask: function (task) {
      Swal.fire({
        title: 'Are you sure to delete this task ?',
        type: 'warning',
        showCancelButton: true,
      }).then(result => {
        if (result.value) {
          db
            .collection('tasks')
            .doc(task.id)
            .delete()
        }
      })
    },
    filterTasksByStatus: function (status) {
      return this.tasks
        .filter(task => task.status === status)
    },
    isBacklog: function (status) {
      return status.value === 'backlog'
    },
    getNextStatus: function (status) {
      return this.taskStatus[
        this.taskStatus.findIndex(s => s.value === status.value) + 1
      ]
    },
    getPrevStatus: function (status) {
      return this.taskStatus[
        this.taskStatus.findIndex(s => s.value === status.value) - 1
      ]
    },
    handleClickNewTask: function () {
      this.showCreateTaskModal = true
    }
  }
}
</script>

<style scoped>

#app {
  min-height: 100vh;
}

.is-divider {
  border-top-width: .4rem;
}

</style>
