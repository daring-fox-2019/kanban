<template>
  <div id="app">
    <div id="contrainer">
      <div id="nav">
        <h2>KANBAN</h2>
        <b-button variant="success" size="sm" v-b-modal.modal-1>New Task</b-button>
      </div>
      <div class="row">
        <CategoryTask
          v-for="(task, index) in taskData"
          :key="index"
          :headertest="task.name"
          :list="task.tasks"
          :variant="task.variant"
        ></CategoryTask>
      </div>
      <!-- MODAL NEW TASK -->
      <b-modal id="modal-1" title="New Task" :modal="statusModal" ref="modal-1">
        <form>
          <b-container fluid>
            <b-form-group label="Title :" label-for="title">
              <b-form-input id="title" v-model="title" required
              placeholder="Task Title"></b-form-input>
            </b-form-group>
            <b-form-group label="Desription :" label-for="description">
              <b-form-input
                id="description"
                v-model="description"
                required
                placeholder="Task Short Desription"
              ></b-form-input>
            </b-form-group>
            <b-form-group label="Point :" label-for="point">
              <b-form-input id="point" v-model="point" required
              placeholder="Task Point">0</b-form-input>
            </b-form-group>
            <b-form-group label="Assigned To :" label-for="assignedTo">
              <b-form-input id="assignedTo" v-model="assignedTo" required
              placeholder="Assigned To"></b-form-input>
            </b-form-group>
          </b-container>
        </form>
        <div slot="modal-footer">
          <b-button variant="success" @click="add">Create</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CategoryTask from '@/components/CategoryTask.vue';
import db from '@/api/api';
import swal from 'sweetalert';

export default {
  name: 'categoryTask',
  components: {
    CategoryTask,
  },
  data() {
    return {
      statusModal: false,
      description: '',
      point: '',
      title: '',
      assignedTo: '',
      taskData: [
        {
          name: 'Pre-Log',
          tasks: [],
          variant: 'danger',
        },
        {
          name: 'To-Do',
          tasks: [],
          variant: 'warning',
        },
        {
          name: 'On-Going',
          tasks: [],
          variant: 'primary',
        },
        {
          name: 'Finished',
          tasks: [],
          variant: 'success',
        },
      ],
    };
  },
  mounted() {
    db.collection('task').onSnapshot((snapshot) => {
      this.taskData[0].tasks = [];
      this.taskData[1].tasks = [];
      this.taskData[2].tasks = [];
      this.taskData[3].tasks = [];
      snapshot.forEach((change) => {
        if (change.data().status === 'Pre-Log') {
          this.taskData[0].tasks.push({ id: change.id, ...change.data() });
        } else if (change.data().status === 'To-Do') {
          this.taskData[1].tasks.push({ id: change.id, ...change.data() });
        } else if (change.data().status === 'On-Going') {
          this.taskData[2].tasks.push({ id: change.id, ...change.data() });
        } else if (change.data().status === 'Finished') {
          this.taskData[3].tasks.push({ id: change.id, ...change.data() });
        }
      });
    });
  },
  methods: {
    add() {
      db.collection('task')
        .add({
          description: this.description,
          point: this.point,
          title: this.title,
          assignedTo: this.assignedTo,
          status: 'Pre-Log',
        })
        .then(() => {
          swal('Add Task Success!', '', 'success');
          this.$refs['modal-1'].hide();
          this.description = '';
          this.point = '';
          this.title = '';
          this.assignedTo = '';
        })
        .catch(({ error }) => {
          console.error('Error adding document: ', error);
        });
    },
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
  width: 90%;
  margin: auto;
}
#nav {
  padding: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
