<template>
  <v-card class="mb-3 custom-card">
    <v-card-title>
      <h2>{{ todo.title }}</h2>
    </v-card-title>
    <v-card-text>
      <p>{{ todo.description }}</p>
      <span></span>
      <div style="display: flex; justify-content: space-between;">
        <small>(Priority lv. {{ todo.point}})</small>
        <small>{{ todo.assigned }}</small>
      </div>
    </v-card-text>
    <v-card-actions style="display: flex; justify-content: space-between;">
      <v-btn
        flat
        small
        v-show="todo.status != 'Back-log'"
        v-if="!loadLeft"
        @click.prevent="moveLeft(todo.id)"
      >Prev</v-btn>
      <v-btn flat small v-show="todo.status == 'Back-log'" disabled>Prev</v-btn>
      <v-progress-circular indeterminate v-if="loadLeft"></v-progress-circular>
      <v-btn flat small color="error" @click.prevent="deleteTodo(todo.id)">Delete</v-btn>
      <v-btn
        flat
        small
        v-show="todo.status != 'Finished'"
        v-if="!loadRight"
        @click.prevent="moveRight(todo.id)"
      >Next</v-btn>
      <v-btn flat small v-show="todo.status == 'Finished'" disabled>Next</v-btn>
      <v-progress-circular indeterminate v-if="loadRight"></v-progress-circular>
    </v-card-actions>
  </v-card>
</template>

<script>
import swal from "sweetalert";
import db from "@/api/firebase.js";
// alertify.success('Ready!');

export default {
  name: "card",
  props: ["todo", "header"],
  data() {
    return {
      loadLeft: false,
      loadRight: false
    };
  },
  methods: {
    moveLeft(id) {
      let prevHeader =
        this.header == "Finished"
          ? "On-Going"
          : this.header == "On-Going"
          ? "To-Do"
          : "Back-log";
      db.collection("Tasks")
        .doc(id)
        .update({ status: prevHeader });
    },
    moveRight(id) {
      let nextHeader =
        this.header == "Back-log"
          ? "To-Do"
          : this.header == "To-Do"
          ? "On-Going"
          : "Finished";
      db.collection("Tasks")
        .doc(id)
        .update({ status: nextHeader });
    },
    deleteTodo(id) {
      swal({
        title: "Are you sure?",
        text:
          "Once deleted, you will not be able to recover this todo!",
        icon: "warning",
        buttons: true,
        dangerMode: true
      })
        .then(willDelete => {
          if (willDelete) {
            return db
              .collection("Tasks")
              .doc(id)
              .delete();
          }
          return null;
        })
        .then(data => {
          if (data !== null) {
            swal("Poof! Your todo has been deleted!", {
              icon: "success"
            });
          } else {
            swal("Deletion canceled!");
          }
        })
        .catch(error => {
          console.log("Error deleting file:", error);
        });
    }
  }
};
</script>

<style>
.custom-card {
  cursor: grab;
}
.custom-card:active {
  cursor: grabbing;
}
</style>
