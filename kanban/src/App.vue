<template>
  <div id="app">
    {{test}}
    <b-modal id="new-task-modal" title="Add a new Task" hide-footer>
      <Item :task="{}" @create="addOne" @exitmodal="$bvModal.hide('new-task-modal')"/>
    </b-modal>
    <div class="hello">
      <div class="row">
        <div class="col-md-12 p-4">
          <b-button variant="success" size="xl" @click="$bvModal.show('new-task-modal')">+ new task</b-button>
        </div>
        
        <div class="col-md-3  back-log-color">
          <h3 class="back-log-header">back log</h3>
          <Item
            v-for="item in backlogTasks"
            :key="item.id"
            :task="item"
            @update="saveOne"
            @remove="removeOne"
          />
        </div>
        <div class="col-md-3 to-do-color">
          <h3 class="to-do-header ">to-do</h3>
          <Item
            v-for="item in todoTasks"
            :key="item.id"
            :task="item"
            @update="saveOne"
            @remove="removeOne"
          />
        </div>
        <div class="col-md-3 doing-color">
          <h3 class="doing-header">doing</h3>
          <Item
            v-for="item in doingTasks"
            :key="item.id"
            :task="item"
            @update="saveOne"
            @remove="removeOne"
          />
        </div>
        <div class="col-md-3  done-color">
          <h3 class="done-header">done</h3>
          <Item
            v-for="item in doneTasks"
            :key="item.id"
            :task="item"
            @update="saveOne"
            @remove="removeOne"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Item from "./components/item.vue";
import swal from "sweetalert2";
import db from "@/api/firebase";

const [BACKLOG, TODO, DOING, DONE] = [1, 2, 3, 4];
const _getTaskByType = (tasks, type) => tasks.filter(t => t.status == type);

export default {
  name: "app",
  components: {
    Item
  },
  data() {
    return {
      test: process.env.VUE_APP_APIKEY,
      tasks: []
    };
  },
  computed: {
    backlogTasks: function() {
      return _getTaskByType(this.tasks, BACKLOG);
    },
    todoTasks: function() {
      return _getTaskByType(this.tasks, TODO);
    },
    doingTasks: function() {
      return _getTaskByType(this.tasks, DOING);
    },
    doneTasks: function() {
      return _getTaskByType(this.tasks, DONE);
    }
  },
  mounted() {
    db.collection("tasks").onSnapshot(tasksSnapshot => {
      this.tasks = tasksSnapshot.docs.map(task => ({
        id: task.id,
        ...task.data()
      }));
    });
  },
  methods: {
    async addOne(newTask) {
      try {
        await db.collection("tasks").add(newTask);
      } catch (error) {
        console.log(error);
      }
    },
    async saveOne(newTask) {
      try {
        let { id } = newTask;
        delete newTask.id;
        await db
          .collection("tasks")
          .doc(id)
          .update(newTask);
      } catch (error) {
        console.log(`error updating document`);
        console.log(error);
      }
    },
    async removeOne(id) {
      console.log(`we are trying to remove ${id}`);
      try {
        await db
          .collection("tasks")
          .doc(id)
          .delete();
      } catch (error) {
        console.error("Error removing document: " + task.id, error);
      }
    }
  }
};
</script>




<style lang="scss">
// @import "assets/_custom.scss";

@import "~bootstrap/scss/bootstrap.scss";
@import "~bootstrap-vue/dist/bootstrap-vue.css";
@import url('https://fonts.googleapis.com/css?family=Baloo+Bhai&display=swap');
body {
  margin: 0;
}

.back-log-color {
  background-color: coral;
}

.to-do-color {
  background-color: orange;
}
.doing-color {
  background-color: aquamarine;
}
.done-color {
  background-color: yellowgreen;
}
#app {
  font-family: 'Baloo Bhai',Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


