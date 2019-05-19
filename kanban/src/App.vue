<template>
  <v-app >
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-img src="https://www.macupdate.com/images/icons256/58278.png" width="60px" style="margin-top:0px"></v-img>
        <p style="margin-top:-45px; margin-left:65px">Kanban 看板</p>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn class="mr-5" color="gray" v-on:click="newTaskForm()">Add new task</v-btn>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>

    <v-footer id='footer' dark height="auto">
      <v-card
        class="flex"
        flat
        tile
      >
        <v-card-actions class="grey darken-3 justify-center">
          <strong class="mr-2"> Rizky Anas Bukhori</strong>&copy;2019
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import Swal from 'sweetalert2'
import db from '@/api/firebase.js'

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      newTask: {
        title: '',
        description: '',
        point: 0,
        assignedTo: '',
        status: 'plan'
      }
      //
    }
  },
  methods: {
    check () {
      if (this.newTask.title && this.newTask.description && this.newTask.point && this.newTask.assignedTo) {
        this.addNewTask()
      } else {
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Please fill all fields'
        })
          .then(() => {
            this.newTaskForm()
          })
      }
    },
    addNewTask () {
      console.log(this.newTask)
      let timerInterval
      Swal.fire({
        title: 'Creating new task',
        timer: 2000,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.timer
        ) {
          const Toast = Swal.mixin({
            toast: true,
            position: 'bottom-center',
            showConfirmButton: false,
            timer: 3000
          })
          Toast.fire({
            type: 'success',
            title: 'New task added'
          })
          db.collection('tasks')
            .add(this.newTask)
            .then((docRef) => {
              console.log('Document written with ID: ', docRef.id)
            })
            .catch((error) => {
              console.error('Error adding document: ', error)
            })
        }
      })
    },
    newTaskForm () {
      Swal.fire({
        title: 'Submit your new task!',
        html:
        `
        <input id="swal-input1" class="swal2-input" type="text" placeholder="Title.." autocomplete="off" autofocus>
        <input id="swal-input2" class="swal2-input" type="text" placeholder="Assigned to.." autocomplete="off">
        <textarea id="swal-input4"class="swal2-textarea" placeholder="Description.." style="display: flex;"></textarea>
        <div style="">
          <input id="swal-input3" class="form-control" type="number" placeholder="Point.." autocomplete="off" min="0" style="font-size: 18px; height: 45px; border: 1px solid #d8d8d8; border-radius: 5px; padding-left: 15px;">
        </div>
        `,
        confirmButtonText: 'Submit',
        showCancelButton: true
      })
        .then(({ value }) => {
          if (value) {
            this.newTask.title = document.getElementById('swal-input1').value
            this.newTask.assignedTo = document.getElementById('swal-input2').value
            this.newTask.point = document.getElementById('swal-input3').value
            this.newTask.description = document.getElementById('swal-input4').value
            this.check()
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    loading () {
      let timerInterval
      Swal.fire({
        title: 'Welcome !',
        html: `<h2>Fetching data...</h2>`,
        timer: 2500,
        onBeforeOpen: () => {
          Swal.showLoading()
          timerInterval = setInterval(() => {
          }, 100)
        },
        onClose: () => {
          clearInterval(timerInterval)
        }
      }).then((result) => {
        if (
          // Read more about handling dismissals
          result.dismiss === Swal.DismissReason.timer
        ) {
        }
      })
    }
  },
  created () {
    this.loading()
  }
}
</script>

<style>
body {
  padding-right: 0px !important
}
</style>
