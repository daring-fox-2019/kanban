<template>
  <v-flex xs3 ma-3>
    <v-card :color="category.color">
      <v-card-title class="font-weight-black">
        <v-card class="mx-auto btn px-3 py-1">{{category.name}}</v-card>
      </v-card-title>
      <v-card-actions>
        <v-btn
          class="mx-auto"
          small
          v-show="category.name != 'Back-log'"
          @click.prevent="prevAll(category.todos)"
        >Prev All</v-btn>
        <v-btn class="mx-auto" small v-show="category.name == 'Back-log'" disabled>Prev All</v-btn>
        <!-- <v-btn class="mx-auto" small color="error">Delete All</v-btn> -->
        <v-btn
          class="mx-auto"
          small
          v-show="category.name != 'Finished'"
          @click.prevent="nextAll(category.todos)"
        >Next All</v-btn>
        <v-btn class="mx-auto" small v-show="category.name == 'Finished'" disabled>Next All</v-btn>
      </v-card-actions>
      <v-card-text>
        <draggable
          v-model="category.todos"
          :group="{name:'task'}"
          :sortable="false"
          @change="addEvent"
        >
          <card v-for="(item, index) in category.todos" :header="header" :key="index" :todo="item"/>
        </draggable>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
import card from "./card.vue";
import draggable from "vuedraggable";
import db from "@/api/firebase";

export default {
  name: "board",
  props: ["category", "header"],
  components: {
    card,
    draggable
  },
  data() {
    return {};
  },
  methods: {
    addEvent(evt) {
      console.log({ evt });
      let { added, removed, moved } = evt;
      let id = added
        ? added.element.id
        : removed
        ? removed.element.id
        : moved.element.id;
      // console.log({ id, header: this.header })
      if (added) {
        db.collection("Tasks")
          .doc(id)
          .update({ status: this.category.name });
      }
    },
    prevAll(todos) {
      console.log({ todos, header: this.header });
      let prevHeader =
        this.header == "Finished"
          ? "On-Going"
          : this.header == "On-Going"
          ? "To-Do"
          : "Back-log";
      todos.forEach(item => {
        db.collection("Tasks")
          .doc(item.id)
          .update({ status: prevHeader });
      });
    },
    nextAll(todos) {
      console.log({ todos, header: this.header });
      let nextHeader =
        this.header == "Back-log"
          ? "To-Do"
          : this.header == "To-Do"
          ? "On-Going"
          : "Finished";
      todos.forEach(item => {
        db.collection("Tasks")
          .doc(item.id)
          .update({ status: nextHeader });
      });
    }
  }
};
</script>

<style>
</style>
