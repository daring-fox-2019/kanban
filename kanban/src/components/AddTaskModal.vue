<template>
  <v-app id="inspire" style="height:70px">
    <v-layout row>
      <v-dialog v-model="dialog" persistent max-width="600px">

        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on" large>Add Task</v-btn>
        </template>
        
        <v-card>
          <v-card-title>
            <span class="headline">Add Task</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field label="Title" required v-model="form.title"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Description" required v-model="form.description"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Point" required v-model="form.point"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Assigned To" required v-model="form.assignedto"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat @click.prevent="addTask">Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
  </v-app>
</template>

<script>
import db from "@/database/firebase.js";
import Swal from "sweetalert2";

let kanbansRef = db.ref("kanban");

export default {
  data: () => ({
    dialog: false,
    form: {
      title: "",
      description: "",
      point: "",
      assignedto: "",
      status: "Backlog",
      createdBy: localStorage.getItem('userName')
    }
  }),
  created() {
    this.title = "";
    this.description = "";
    this.point = "";
    this.assignedto = "";
    this.dialog = false;
  },
  methods: {
    addTask() {
      if (
        this.form.title == "" ||
        this.form.description == "" ||
        this.form.point == "" ||
        this.form.assignedto == ""
      ) {
        Swal.fire({
          type: "error",
          title: "Oops...",
          text: "All field must not empty",
        });
      } else if(isNaN(this.form.point)){
         Swal.fire({
          type: "error",
          title: "Oops...",
          text: "Point field must a number",
        });
      }else {
        Swal.fire({
          type: "success",
          title: "Add Task",
          text: "Success add task",
        });
        kanbansRef.push(this.form);
        this.form.title = "";
        this.form.description = "";
        this.form.point = "";
        this.form.assignedto = "";
        this.dialog = false;
      }
    }
  }
};
</script>

