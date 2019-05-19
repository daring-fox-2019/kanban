<template>
  <v-card color="white" class="black--text">
    <v-layout>
      <v-flex>
        <v-card-title primary-title>
          <div class="headline mx-2">{{task.title}}</div>
        </v-card-title>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <div class="my-1 mx-4">Point : {{task.point}}</div>
    <div class="my-1 mx-4">Assigned by : {{task.assignedTo}}</div>
    <div style="width:230px; margin-left:10px">
      <div>
        <v-btn v-if="task.status === 'plan'" small disabled class="mx-3"><i class="fas fa-arrow-circle-left"></i></v-btn>
        <v-btn v-if="task.status !== 'plan'" v-on:click="left(task.id)" dark small color="blue" class="mx-3"><i class="fas fa-arrow-circle-left"></i></v-btn>
        <v-btn v-if="task.status === 'done'" small disabled class=""><i class="fas fa-arrow-circle-right"></i></v-btn>
        <v-btn v-if="task.status !== 'done'" v-on:click="right(task.id)" dark small color="blue" class=""><i class="fas fa-arrow-circle-right"></i></v-btn>
      </div>
      <div>
        <v-btn v-on:click="showDetails" dark small color="teal" class="mx-3" style="margin-bottom:20px">Detail</v-btn>
        <v-btn v-on:click="deleteTask(task.id)" dark small color="red" class="" style="margin-bottom:20px">Delete</v-btn>
      </div>
    </div>
  </v-card>
</template>

<script>
import Swal from 'sweetalert2'
import db from '@/api/firebase.js'

export default {
  props: ['task'],
  data () {
    return {

    }
  },
  methods: {
    showDetails () {
      Swal.fire({
        title: `${this.task.title}`,
        html:
          `
          <div style="margin: auto; width:100%; font-size:20px; !important">
            <div style="margin-bottom:10px">
              <h4>Description: </h4>
              <p>${this.task.description}</p>
            </div>
            <v-divider></v-divider>
            <h5>Point: ${this.task.point}</h5>
            <h5>Assigned to: ${this.task.assignedTo}</h5>
            <h5 class="">Status: ${this.task.status}</h5>
          </div>`,
        focusConfirm: false,
        confirmButtonText: 'Back',
        confirmButtonAriaLabel: 'Back'
      })
    },
    deleteTask (id) {
      Swal.fire({
        title: `Delete "${this.task.title}"?`,
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'The task has been deleted.',
            'success'
          )
          db.collection('tasks').doc(id).delete()
            .then(function () {
              console.log('Document successfully deleted!')
            })
            .catch(function (error) {
              console.error('Error removing document: ', error)
            })
        }
      })
    },
    right (id) {
      let status = ''
      if (this.task.status === 'plan') {
        status = 'todo'
      } else if (this.task.status === 'todo') {
        status = 'ongoing'
      } else if (this.task.status === 'ongoing') {
        status = 'done'
      }
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 2000
      })
      Toast.fire({
        type: 'success',
        html: `
        <h2 class="mx-3">Moved "${this.task.title}" to "${status}" list</h2>`
      })
      db.collection('tasks').doc(id)
        .update({
          status: status
        })
        .then(function () {
          console.log('Document successfully updated!')
        })
    },
    left (id) {
      let status = ''
      if (this.task.status === 'todo') {
        status = 'plan'
      } else if (this.task.status === 'ongoing') {
        status = 'todo'
      } else if (this.task.status === 'done') {
        status = 'ongoing'
      }
      const Toast = Swal.mixin({
        toast: true,
        position: 'center',
        showConfirmButton: false,
        timer: 1000
      })
      Toast.fire({
        type: 'success',
        html: `
        <h2 class="mx-3">Moved "${this.task.title}" to "${status}" list</h2>`
      })
      db.collection('tasks').doc(id)
        .update({
          status: status
        })
        .then(function () {
          console.log('Document successfully updated!')
        })
    }
  }
}
</script>
