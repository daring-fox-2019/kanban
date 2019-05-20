<template>
  <div>
    <div class="card-content m-4" v-if="taskContent.status === status">
      <div class="card">
        <div class="card-body">
          <h4 class="card-title">
            <a>{{ taskContent.title }}</a>
          </h4>
          <p class="card-text">Point: {{ taskContent.poin }}</p>
          <p class="card-text">Assigned To: {{ taskContent.assignedto }}</p>
          <div class="text-center">
            <a
              href
              class="btn btn-default btn-rounded btn-sm"
              data-toggle="modal"
              :data-target="'#' + taskContent.id"
            >
              Show
              Detail
              <i class="far fa-eye ml-1 text-white"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade left"
      :id="[taskContent.id]"
      tabindex="-1"
      role="dialog"
      aria-labelledby="myModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-notify modal-warning" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <p class="heading font-weight-bold text-uppercase">{{ taskContent.title }}</p>

            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true" class="white-text">&times;</span>
            </button>
          </div>

          <div class="modal-body">
            <div class="row">
              <div class="col-3 text-center">
                <img
                  src="https://cdn4.iconfinder.com/data/icons/modern-education-3/128/118-512.png"
                  alt="IMG of Details"
                  class="img-fluid z-depth-1-half rounded-circle"
                >
                <div style="height: 10px"></div>
                <p class="title mb-0">Assigned To</p>
                <p class="text-muted" style="font-size: 13px">{{ taskContent.assignedto }}</p>
              </div>

              <div class="col-9">
                <p class="font-weight-bold mb-0">Task Description:</p>
                <p class="card-text">{{ taskContent.description }}</p>
                <p class="font-weight-bold mb-0">Point:</p>
                <p class="card-text">{{ taskContent.poin }}</p>
                <p class="font-weight-bold mb-0">Status:</p>
                <p class="card-text">{{ taskContent.status }}</p>
              </div>
            </div>
          </div>

          <div class="modal-footer justify-content-around">
            <a
              type="button"
              class="btn btn-unique btn-sm btn-warning"
              data-dismiss="modal"
              v-if="prev"
              @click="prevState"
            >{{ prev }}</a>
            <a
              type="button"
              class="btn btn-danger btn-sm"
              data-dismiss="modal"
              @click="removeTask"
            >Delete</a>
            <a
              type="button"
              class="btn btn-dark-green btn-sm btn-success"
              data-dismiss="modal"
              v-if="next"
              @click="nextState"
            >{{ next }}</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "@/assets/api.js";
export default {
  name: "card-content",
  props: ["taskContent", "status"],
  data() {
    return {
      next: "",
      prev: ""
    };
  },
  created() {
    let currentState = this.taskContent.status;
    if (currentState === "Back-Log") {
      this.next = "To-Do";
      this.prev = null;
    } else if (currentState === "To-Do") {
      this.next = "Doing";
      this.prev = "Back-Log";
    } else if (currentState === "Doing") {
      this.next = "Done";
      this.prev = "To-Do";
    } else if (currentState === "Done") {
      this.next = null;
      this.prev = "Doing";
    }
  },
  methods: {
    getPrevNext() {
      let currentState = this.taskContent.status;
      if (currentState === "Back-Log") {
        this.next = "To-Do";
        this.prev = null;
      } else if (currentState === "To-Do") {
        this.next = "Doing";
        this.prev = "Back-Log";
      } else if (currentState === "Doing") {
        this.next = "Done";
        this.prev = "To-Do";
      } else if (currentState === "Done") {
        this.next = null;
        this.prev = "Doing";
      }
    },
    removeTask() {
      db.collection("todo")
        .doc(this.taskContent.id)
        .delete();
    },
    nextState() {
      db.collection("todo")
        .doc(this.taskContent.id)
        .set({
          title: this.taskContent.title,
          assignedto: this.taskContent.assignedto,
          poin: this.taskContent.poin,
          description: this.taskContent.description,
          status: this.next
        })
        .then(() => {
          this.getPrevNext();
        });
    },
    prevState() {
      db.collection("todo")
        .doc(this.taskContent.id)
        .set({
          title: this.taskContent.title,
          assignedto: this.taskContent.assignedto,
          poin: this.taskContent.poin,
          description: this.taskContent.description,
          status: this.prev
        })
        .then(() => {
          this.getPrevNext();
        });
    }
  }
};
</script>

<style>
</style>
