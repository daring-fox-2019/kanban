<template>
  <div class="col-lg-3 box">
    <div :class="`box-row box-row-${category}`" :id="`${category}`">{{ title }}</div>
    
    <div :class="`box-row box-row-${category}`">
      <div style="width: 100%;">
        <div v-for="(taskData, index) in tasksData" :key="index">
          <b-card :title="taskData.title" tag="article">
            <b-card-text>Point: {{ taskData.point }}</b-card-text>
            <b-card-text>Assigned To: {{ taskData.assignedTo }}</b-card-text>

            <b-button
              :variant="showDetailsVariant"
              @click="onClickDetails(taskData)"
              v-b-modal="`modal-${category}-details`"
            >Show details</b-button>
          </b-card>
        </div>
      </div>
    </div>

    <div>
      <b-modal :ref="`modal-${category}-details-ref`" hide-footer centered :id="`modal-${category}-details`">
        <h4>Task Description:</h4>
        <p class="ml-4">{{ this.selectedTask.description }}</p>
        <h4>Point: {{ this.selectedTask.point }}</h4>
        <p></p>
        <h4>Status: Back-log</h4>
        <p></p>
        <div class="details-button mt-4">
          <b-button variant="outline-danger" @click="onClickDelete" v-if="category === 'back-log'">Delete</b-button>
          <b-button variant="warning" @click="onClickNext(1)" v-if="category === 'back-log'">To-Do</b-button>

          <b-button variant="danger" @click="onClickNext(0)" v-if="category === 'to-do'">Back-Log</b-button>
          <b-button variant="outline-danger" @click="onClickDelete" v-if="category === 'to-do'">Delete</b-button>
          <b-button variant="primary" @click="onClickNext(2)" v-if="category === 'to-do'">Doing</b-button>

          <b-button variant="warning" @click="onClickNext(1)" v-if="category === 'doing'">To-Do</b-button>
          <b-button variant="outline-danger" @click="onClickDelete" v-if="category === 'doing'">Delete</b-button>
          <b-button variant="success" @click="onClickNext(3)" v-if="category === 'doing'">Done</b-button>

          <b-button variant="primary" @click="onClickNext(2)" v-if="category === 'done'">Doing</b-button>
          <b-button variant="outline-danger" @click="onClickDelete" v-if="category === 'done'">Delete</b-button>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import db from '@/api/firebase.js';

export default {
  props: ["tasksData", "title", "category", "showDetailsVariant"],
  title: "Tasks",
  data() {
    return {
      selectedTask: {
        id: "",
        description: "",
        point: ""
      },
      hideButton: false,
    };
  },
  methods: {
    onClickDetails(data) {
      // console.log(data);
      this.selectedTask.id = data.id;
      this.selectedTask.description = data.description;
      this.selectedTask.point = data.point;
      // console.log(this.selectedTask.id)
    },

    onClickDelete() {
      db.collection("Tasks")
        .doc(this.selectedTask.id)
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });

      this.$refs[`modal-${this.category}-details-ref`].hide()
    },

    onClickNext(nextCategory) {
      db.collection("Tasks")
        .doc(this.selectedTask.id)
        .update({ order: nextCategory })
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((err) => {
          console.log(err);
        })

      this.$refs[`modal-${this.category}-details-ref`].hide()
    }
  }
};
</script>

<style>
</style>
