<template>
     <div v-if="task.status == card">
                      <div class="card border-primary mb-3" style="max-width: 18rem;" >
                        <div class="card-header" >{{task.title}}</div>
                        <div class="card-body text-primary">
                          <h5>Description: </h5>
                          <div>
                            {{task.description}}
                          </div>
                          <hr>
                          <h5>Assigned to: </h5>
                          <div>
                            {{task.assign}}
                          </div>
                        </div>
                        <div class="p-2" v-if="task.status !== 'Done'">
                        <button v-on:click="nextCard(task)" style="width:100%" type="button" class="btn btn-primary">Next</button>
                        </div>
                        <div class="p-2" v-if="task.status !== 'Back-Log'">
                        <button v-on:click="prevCard(task)" style="width:100%" type="button" class="btn btn-success">Previous</button>
                        </div>
                        <div class="p-2">
                        <button v-on:click="deleteCard(task.id)" style="width:100%" type="button" class="btn btn-danger">Delete</button>
                        </div>
                    </div>
                  </div> 
</template>

<script>
import db from "../firebase.js";
export default {
    props : ['task','card'],
    methods : {
nextCard(task) {
        if(task.status == 'Back-Log') {
          task.status = 'To-Do'
        }else if ( task.status == 'To-Do') {
          task.status = 'Doing'
        }else if ( task.status == 'Doing') {
          task.status = 'Done'
        }
        db.collection("kanban").doc(task.id).set({
            title: task.title,
          description: task.description,
          assign: task.assign,
          status: task.status,
          createdAt: new Date()
        })
        .then(doc =>{
          console.log('update task succescfully')
        })
        .catch(err =>{
          console.log(err)
        })
      },
      prevCard(task) {
        if(task.status == 'To-Do') {
          task.status = 'Back-Log'
        }else if ( task.status == 'Doing') {
          task.status = 'To-Do'
        }else if ( task.status == 'Done') {
          task.status = 'Doing'
        }
        db.collection("kanban").doc(task.id).set({
            title: task.title,
          description: task.description,
          assign: task.assign,
          status: task.status,
          createdAt: new Date()
        })
        .then(doc =>{
          console.log('update task succescfully')
        })
        .catch(err =>{
          console.log(err)
        })
      },
      deleteCard(taskId) {
        db.collection("kanban").doc(taskId).delete()
        .then(function() {
            console.log("Document successfully deleted!");
        })
        .catch(function(error) {
            console.error("Error removing document: ", error);
        });
      }
    }
}
</script>
<style>

</style>
