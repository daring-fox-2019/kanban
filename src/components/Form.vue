<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" dark v-on="on">
          <v-icon>add</v-icon>new task
        </v-btn>
      </template>
      <v-card>
        <v-form @submit.prevent="save">
          <v-card-title>
            <v-icon class="teal--text">add</v-icon>
            <span class="headline teal--text">Add a new Task</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="title" label="Title*" required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="description" label="Description" type="text"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="point" label="Point*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field
                    v-model="assign"
                    label="Assign To"
                    hint="example of helper text only on focus"
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" flat type="submit">Save</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from "@/firebase/db.js";
export default {
  data: () => ({
    title: "",
    description: "",
    point: "",
    assign: "",
    status: "backlog",
    dialog: false
  }),
  methods: {
    save() {
      db.collection("tasks").add({
        title: this.title,
        description: this.description,
        point: this.point,
        assign: this.assign,
        status: this.status,
        createdAt: new Date()
      });
    }
  }
};
</script>