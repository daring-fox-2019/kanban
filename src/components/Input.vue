<template>
  <div class="main-header">
    <h1>Mini Kanban</h1>
    <input type="text" placeholder="Input Task Here" v-model="taskName">
    <button type="submit" @click="sendItem">Submit Task</button>
  </div>
</template>

<script>
import db from '../assets/config.js'
import swal from 'sweetalert'

export default {
  name: 'InputMain',
  data () {
    return {
      taskName: ''
    }
  },
  methods: {
    sendItem () {
      if (this.taskName === '') {
        swal('Attention', 'You can not add empty task', 'info')
      } else {
        db.collection('todos').add({
          taskName: this.taskName,
          createdAt: new Date(),
          status: 'Wacana'
        })
          .then((docRef) => {
            console.log('"Document written with ID: "', docRef.id)
            db.collection('todos').doc(docRef.id).set({
              taskName: this.taskName,
              createdAt: new Date(),
              status: 'Wacana',
              id: docRef.id
            })
            this.taskName = ''
            swal('Success', 'Task Added', 'success')
          })
          .catch((error) => {
            swal('Sorry!', 'Internal Server Error', 'error')
            console.log('"Error adding document: "', error)
            this.taskName = ''
          })
      }
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
  color: grey;
  margin-left: auto;
  margin-left: auto;
  text-align: center;
  padding-top: 1.5%;
  font-size: 35px;
}
.main-header i {
  font-size: 20px;
  color: grey;
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
}
</style>
