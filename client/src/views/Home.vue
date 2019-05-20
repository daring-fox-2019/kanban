<template>
  <div class="home">
    <div>
      <h1>Kandien</h1>
      <button type="button" class="btn btn-info" data-toggle="modal" data-target="#newTaskForm">Add Task</button>
      <div
        class="modal fade"
        id="newTaskForm"
        tabindex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header text-center btn-info" >
              <h4 class="modal-title w-100 font-weight-bold">Create New Task</h4>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body mx-3">
              <div class="md-form mb-3">
                <label for="form34">Title</label>
                <input type="text" id="form34" v-model="title" class="form-control" required>
              </div>

              <div class="md-form mb-2">
                <label for="form29">Assigned To</label>
                <input type="text" id="form29" v-model="assignedto" class="form-control" required>
              </div>

              <div class="md-form mb-2">
                <label for="form32">Point</label>
                <input type="number" id="form32" v-model="poin" class="form-control" required>
              </div>

              <div class="md-form">
                <label for="form8">Description</label>
                <textarea
                  type="text"
                  id="form8"
                  v-model="description"
                  class="md-textarea form-control"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
            <div class="modal-footer d-flex justify-content-center">
              <button class="btn btn-unique" data-dismiss="modal" @click="addTask">Add</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <category v-bind:tasks="tasks"></category>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import db from "@/assets/api.js";
import category from "@/components/category.vue";
import card from "@/components/card.vue";
import Swal from 'sweetalert2'

export default {
  name: "home",
  components: {
    HelloWorld,
    category,
    card
  },
  data() {
    return {
      tasks: [],
      title: "",
      assignedto: "",
      poin: "",
      description: ""
    };
  },
  created() {
    this.readdata();
  },
  methods: {
    readdata() {
      db.collection("todo")
        .orderBy("title", "asc")
        .onSnapshot(querySnapshot => {
          this.tasks = querySnapshot.docs.map(doc => {
            return {
              id: doc.id,
              ...doc.data()
            };
          });
        });
    }
    ,
    addTask () {
      let poinValidate = /^\d+$/.test(this.poin)
      if (!this.title || !this.assignedto || !this.poin || !this.description) {
        Swal.fire({
          type: 'error',
          title: 'Please fill in all fields',
          showConfirmButton: false,
          timer: 2000
        })
      } else if (!poinValidate) {
        Swal.fire({
          type: 'error',
          title: 'Please input poin with number',
          showConfirmButton: false,
          timer: 2000
        })
      } else {
        db
          .collection('todo')
          .add({
            title: this.title,
            assignedto: this.assignedto,
            poin: +this.poin,
            description: this.description,
            status: 'Back-Log'
          })
          .then(() => {
            let Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000
            })
            Toast.fire({
              type: 'success',
              title: 'Your task has been created'
            })
            this.title = ''
            this.assignedto = ''
            this.poin = ''
            this.description = ''
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }

};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Dancing+Script&display=swap");
h1 {
  font-size: 50px;
  font-weight: bold;
  font-family: "Dancing Script", cursive;
}
</style>

