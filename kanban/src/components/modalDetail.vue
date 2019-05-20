<template>
  <v-layout>
    <v-dialog v-model="dialog" persistent max-width="350">
      <template v-slot:activator="{ on }">
        <v-btn m-5 flat dark v-on="on">Detail</v-btn>
      </template>

      <v-card>
        <v-card-title class="headline">{{textHeader}}</v-card-title>
        <v-card-actions v-if="!confirm">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat @click="confirmChoice()">No</v-btn>
          <v-btn color="green darken-1" flat @click="confirmChoice('Yes')">Yes</v-btn>
        </v-card-actions>

        <v-card-actions v-if="confirm">
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" v-if="end" flat @click="confirmClick(end)">{{end}}</v-btn>
          <v-btn color="green darken-1" flat @click="confirmClick('delete')">Delete</v-btn>
          <v-btn color="green darken-1" v-if="front" flat @click="confirmClick(front)">{{front}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import db from "@/database/firebase.js";

export default {
  props: ["name", "id", "task"],
  data() {
    return {
      dialog: false,
      textHeader: "Move This Item?",
      description: "hehehe",
      confirm: true,
      front: "",
      end: "".description,
      move: "",
      isDel: ""
    };
  },
  mounted() {
    if (this.name == "Backlog") {
      this.front = "Todo";
      this.end = null;
    } else if (this.name == "Todo") {
      this.front = "Doing";
      this.end = "Backlog";
    } else if (this.name == "Doing") {
      this.front = "Done";
      this.end = "Todo";
    } else if (this.name == "Done") {
      this.front = null;
      this.end = "Doing";
    }
  },
  methods: {
    confirmClick(choice) {
      this.textHeader = "Are You Sure ?";
      if (choice == "delete") {
        this.isDel = true;
        this.confirm = false;
      } else {
        this.confirm = false;
        this.move = choice;
      }
    },
    confirmChoice(check) {
      if (check) {
        if (this.isDel) {
          this.isDel = "";
          let kanbansRef = db.ref(`kanban/${this.id}`);
          kanbansRef.remove();
          this.dialog = false;
        } else {
          let kanbansRef = db.ref(`kanban/${this.id}`);
          kanbansRef.update({ status: this.move });
          this.move = "";

          this.dialog = false;
          this.confirm = true;
        }
      } else {
        this.dialog = false;
        this.confirm = true;
      }
    }
  }
};
</script>

