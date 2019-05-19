<template>
  <div id="app" class="container">
    <!-- {{ todoTask }} -->
    <div class="d-flex justify-content-around">
      <HelloWorld msg="Welcome to kanban App"/>
      <button
      class="btn btn-success bg-secondary"
      data-toggle="modal"
      data-target="#exampleModal">Create New Task</button>
    </div>
    <!-- Modal start -->
    <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Create New Task</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body mx-3">
            <form method="post" @submit.prevent="createNewTask">
              <div class="form-group">
                <label for="title" class="float-left">Title</label><br>
                <input
                required
                v-model="newTask.title"
                type="text"
                class="form-control"
                id="title"
                placeholder="Task Title">
              </div>
              <div class="form-group">
                <label for="description" class="float-left">Description</label>
                <textarea
                required
                v-model="newTask.description"
                class="form-control"
                id="description"
                placeholder="Task Short Description"
                rows="3"></textarea>
              </div>
              <div class="form-group">
                <label for="point" class="float-left">Point</label>
                <input
                required
                v-model="newTask.point"
                type="number"
                class="form-control"
                id="point"
                placeholder="0">
              </div>
              <div class="form-group">
                <label for="asignTo" class="float-left">Assigned To</label>
                <input
                required
                v-model="newTask.assignedTo"
                type="text"
                class="form-control"
                id="asignTo"
                placeholder="Assigned To">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button
            type="submit"
            class="btn btn-primary"
            @click.prevent="createNewTask" data-dismiss="modal">Save</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal end -->
  <!-- {{ todoTask[0].task }} -->
      <div class="row justify-content-around ">
        <div class="row-3">
          <papan-task
          @dariAppDone="done"
          @dariAppInProgress="inProgress"
          @dariAppTodo="todo"
          @dariAppBackLog="backLog"
          @dariAppDelete="deleteTask"
          :dataTask='newTask'
          @dariAppcurrentTask="curentTask"
          v-bind:todoTask="todoTask[0]"
          v-bind:title="todoTask[0].name"
          v-bind:color="todoTask[0].color"
           />
        </div>
        <div class="row-3">
          <papan-task
          @dariAppDone="done"
          @dariAppInProgress="inProgress"
          @dariAppTodo="todo"
          @dariAppBackLog="backLog"
          @dariAppDelete="deleteTask"
          :dataTask='newTask'
          @dariAppcurrentTask="curentTask"
          v-bind:todoTask="todoTask[1]"
          v-bind:title="todoTask[1].name"
          v-bind:color="todoTask[1].color"
          />
        </div>
        <div class="row-3">
          <papan-task
          @dariAppDone="done"
          @dariAppInProgress="inProgress"
          @dariAppTodo="todo"
          @dariAppBackLog="backLog"
          @dariAppDelete="deleteTask"
          :dataTask='newTask'
          @dariAppcurrentTask="curentTask"
          v-bind:todoTask="todoTask[2]"
          v-bind:title="todoTask[2].name"
          v-bind:color="todoTask[2].color"
          />
        </div>
        <div class="row-3">
          <papan-task
          @dariAppDone="done"
          @dariAppInProgress="inProgress"
          @dariAppTodo="todo"
          @dariAppBackLog="backLog"
          @dariAppDelete="deleteTask"
          :dataTask='newTask'
          @dariAppcurrentTask="curentTask"
          v-bind:todoTask="todoTask[3]"
          v-bind:title="todoTask[3].name"
          v-bind:color="todoTask[3].color"
          />
        </div>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import HelloWorld from './components/HelloWorld.vue';
import PapanTask from './components/papan.vue';
import db from './api/backend';

export default {
  name: 'app',
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        point: '',
        assignedTo: '',
        status: 'BackLog',
      },
      todoTask: [
        {
          name: 'BackLog',
          color: 'red',
          task: [],
        },
        {
          name: 'Todo',
          color: 'orange',
          task: [],
        },
        {
          name: 'InProgress',
          color: 'green',
          task: [],
        },
        {
          name: 'Done',
          color: 'blue',
          task: [],
        },
      ],
    };
  },
  components: {
    HelloWorld,
    PapanTask,
  },
  props: {

  },
  methods: {
    createNewTask() {
      db.collection('kamvantable')
        .doc()
        .set(this.newTask)
        .then(() => {
          // console.log(docRef.id);
          Swal.fire({
            position: 'center',
            type: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
          });
          this.newTask.title = '';
          this.newTask.description = '';
          this.newTask.point = '';
          this.newTask.assignedTo = '';
          console.log('sukses create new task');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    loadData() {
      db.collection('kamvantable')
        .onSnapshot((querySnapshot) => {
          this.todoTask.map((element) => {
            element.task = [];
            return element;
          });
          querySnapshot.forEach((doc) => {
            const bigData = { id: doc.id, ...doc.data() };
            if (doc.data().status === 'BackLog') {
              this.todoTask[0].task.push(bigData);
            } else
            if (doc.data().status === 'Todo') {
              this.todoTask[1].task.push(bigData);
            } else
            if (doc.data().status === 'InProgress') {
              this.todoTask[2].task.push(bigData);
              // console.log(this.todoTask[2].task);
            } else
            if (doc.data().status === 'Done') {
              this.todoTask[3].task.push(bigData);
            }
            // console.log(doc.id, '=>', doc.data());
          });
        });
    },
    curentTask(taskDetail) {
      this.newTask = taskDetail;
    },
    done(id) {
      db.collection('kamvantable')
        .doc(id)
        .update({
          status: 'Done',
        });
    },
    inProgress(id) {
      db.collection('kamvantable')
        .doc(id)
        .update({
          status: 'InProgress',
        });
    },
    todo(id) {
      db.collection('kamvantable')
        .doc(id)
        .update({
          status: 'Todo',
        });
    },
    backLog(id) {
      db.collection('kamvantable')
        .doc(id)
        .update({
          status: 'BackLog',
        });
    },
    deleteTask(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          db.collection('kamvantable')
            .doc(id)
            .delete();
          Swal.fire({
            title: 'Deleted!',
            text: 'Your file has been deleted.',
            type: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
