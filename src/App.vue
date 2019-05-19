<template>
  <div>
    <div class="d-flex justify-content-center mt-3">
      <button class="btn btn-outline-primary my-2 my-sm-0" style="width:200px" type="submit" data-toggle="modal" data-target="#exampleModal">New Task</button>
    </div>
    <div class="container mt-5">
      <div class="row">
        <div class="col-3" v-for="card in cardTitles" :key="card">
          <Card v-bind:card="card" v-bind:tasks="tasks" />
          
        </div>
      </div>
    </div>
    <!-- Modal -->
    <div class="modal fade mt-5" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="input-group mb-3">
              <div class="input-group">
                <label for="">Title</label>
              </div>
              <input v-model="newTask.title" type="text" class="form-control" placeholder="Title" aria-label="Text input with dropdown button">
              <div class="input-group">
                <label for="">Description</label>
              </div>
              <input v-model="newTask.description" type="text" class="form-control" placeholder="Description" aria-label="Text input with dropdown button">
            </div>
            <div class="input-group">
                <label for="">Assigned To</label>
              </div>
            <input v-model="newTask.assign" type="text" class="form-control" placeholder="Assigned To" aria-label="Text input with dropdown button">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button v-on:click="addTask" type="button" class="btn btn-primary" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "./firebase.js";
import Card from "./components/Card.vue"
export default {
  components : {
    Card
  },
  data() {
    return {
      cardTitles : ['Back-Log','To-Do','Doing','Done'],
      newTask : {
        title : '',
        description : '',
        assign : ''
      },
      tasks : []
    };
  },
  methods: {
      addTask () {
        db.collection("kanban").add({
          title: this.newTask.title,
          description: this.newTask.description,
          assign: this.newTask.assign,
          status: 'Back-Log',
          createdAt: new Date()
        })
        .then(docRef =>{
          console.log("Document written with ID: ", docRef.id);
          this.newTask.title = ''
          this.newTask.description = ''
          this.newTask.assign = ''
        })
        .catch(err =>{
          console.log(err)
        })
      },
      // nextCard(task) {
      //   if(task.status == 'Back-Log') {
      //     task.status = 'To-Do'
      //   }else if ( task.status == 'To-Do') {
      //     task.status = 'Doing'
      //   }else if ( task.status == 'Doing') {
      //     task.status = 'Done'
      //   }
      //   db.collection("kanban").doc(task.id).set({
      //       title: task.title,
      //     description: task.description,
      //     assign: task.assign,
      //     status: task.status,
      //     createdAt: new Date()
      //   })
      //   .then(doc =>{
      //     console.log('update task succescfully')
      //   })
      //   .catch(err =>{
      //     console.log(err)
      //   })
      // },
      // prevCard(task) {
      //   if(task.status == 'To-Do') {
      //     task.status = 'Back-Log'
      //   }else if ( task.status == 'Doing') {
      //     task.status = 'To-Do'
      //   }else if ( task.status == 'Done') {
      //     task.status = 'Doing'
      //   }
      //   db.collection("kanban").doc(task.id).set({
      //       title: task.title,
      //     description: task.description,
      //     assign: task.assign,
      //     status: task.status,
      //     createdAt: new Date()
      //   })
      //   .then(doc =>{
      //     console.log('update task succescfully')
      //   })
      //   .catch(err =>{
      //     console.log(err)
      //   })
      // },
      // deleteCard(taskId) {
      //   db.collection("kanban").doc(taskId).delete()
      //   .then(function() {
      //       console.log("Document successfully deleted!");
      //   })
      //   .catch(function(error) {
      //       console.error("Error removing document: ", error);
      //   });
      // }

  },
  created() {
    db.collection("kanban").orderBy('createdAt','desc')
      .onSnapshot(
        querySnapshot => {
          this.tasks = []
          querySnapshot.forEach(doc => {
            this.tasks.push({ ...doc.data(), id: doc.id });
          })
        }
      )
  }
};
</script>

<style>
</style>
