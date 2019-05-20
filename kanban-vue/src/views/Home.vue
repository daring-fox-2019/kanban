<template>
  <div class="home">
    <div class="container-custom">
      <Nav/>
      <div class="row">
        <Tasks :tasks-data="backlogTasks" :title="'Back-Log'" :category="'back-log'" :show-details-variant="'danger'"/>
        <Tasks :tasks-data="todoTasks" :title="'To-Do'" :category="'to-do'" :show-details-variant="'warning'"/>
        <Tasks :tasks-data="doingTasks" :title="'Doing'" :category="'doing'" :show-details-variant="'primary'"/>
        <Tasks :tasks-data="doneTasks" :title="'Done'" :category="'done'" :show-details-variant="'success'"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from "@/api/firebase.js";
import Nav from "@/components/Nav.vue";
import Tasks from "@/components/Tasks.vue";

export default {
  name: "home",
  data() {
    return {
      tasks: [],
      backlogTasks: [],
      todoTasks: [],
      doingTasks: [],
      doneTasks: []
    };
  },
  mounted() {
    db.collection("Tasks")
      .orderBy("point", "desc")
      .onSnapshot(querySnapshot => {
        this.tasks = [];
        this.backlogTasks = [];
        this.todoTasks = [];
        this.doingTasks = [];
        this.doneTasks = [];

        querySnapshot.forEach(doc => {
          const task = { ...doc.data(), id: doc.id };
          this.tasks.push(task);

          // console.log(task);
          // console.log(task.order);

          if (task.order === 0) {
            this.backlogTasks.push(task);
          } else if (task.order === 1) {
            this.todoTasks.push(task);
          } else if (task.order === 2) {
            this.doingTasks.push(task);
          } else if (task.order === 3) {
            this.doneTasks.push(task);
          }
          
          // console.log(this.doneTasks);
        });
      });
  },
  components: {
    Nav,
    Tasks,
  }
};
</script>

<style>
/* ======================= */
/* Container */
/* ======================= */
.container-custom {
  width: 85%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

/* ======================= */
/* Nav */
/* ======================= */
nav {
  display: flex !important;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgb(243, 104, 23);
  color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 9px 0px rgba(224, 96, 21, 0.46);
}

/* ======================= */
/* Box */
/* ======================= */
.card {
  border-radius: 0;
}

.box-row {
  display: flex;
  justify-content: center;
  box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.089);
}
.box {
  border-radius: 3px;
}

.box-row:hover {
  filter: brightness(0.99);
  /* transition: filter 0.1s linear; */
}

/* ======================= */
/* Categories */
/* ======================= */

.box-row-back-log {
  border: 1px solid rgb(221, 66, 66);
}

.box-row-to-do {
  border: 1px solid rgb(179, 182, 0);
}

.box-row-doing {
  border: 1px solid rgb(58, 109, 204);
}

.box-row-done {
  border: 1px solid rgb(70, 204, 58);
}

.box-row:first-child {
  font-weight: bold;
  border-bottom: 0;
  text-align: center;
  color: white;
}

#back-log {
  background-color: rgb(221, 66, 66);
}

#to-do {
  background-color: rgb(179, 182, 0);
}

#doing {
  background-color: rgb(58, 109, 204);
}

#done {
  background-color: rgb(70, 204, 58);
}

/* ======================= */
/* Details */
/* ======================= */
.details-button {
  display: flex;
  justify-content: space-between;
}
</style>
