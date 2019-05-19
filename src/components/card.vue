<template>
  <div>
    <b-card :border-variant="todo.color" align="left" class="mb-2 p-0">
      <b-row no-gutters>
        <b-col v-if="todo.status !== 'back-log'" md="1">
          <a href="#" :style="{ color: panel.colorCSS}" @click="moveLeft">
            <i class="fas fa-chevron-left"></i>
          </a>
        </b-col>
        <b-col md="10">
          <div>
            <h5>{{todo.title}}</h5>
            <b-link href="#" class="card-link" style="color:#B3ADAD" @click="$emit('detail',todo)">detail</b-link>
          </div>
        </b-col>
        <b-col v-if="todo.status !== 'done'" md="1">
          <a href="#" :style="{ color: panel.colorCSS}" @click="moveRight">
            <i class="fas fa-chevron-right"></i>
          </a>
        </b-col>
      </b-row>
    </b-card>
  </div>
</template>

<script>

import { db } from "@/main.js";
export default {
  name: "card",
  props: ["todo", "panel"],
  methods: {
    moveRight() {
      let obj = {
        "back-log": 0,
        0: "back-log",
        todo: 1,
        1: "todo",
        doing: 2,
        2: "doing",
        done: 3,
        3: "done"
      };
      let current = obj[this.todo.status];
      let newCurrent = current + 1;
      console.log(newCurrent);
      let newStatus = obj[newCurrent];
      console.log(newStatus);
      db.collection("todo")
        .doc(this.todo.id)
        .update({
          status: newStatus
        });
    },
    moveLeft() {
      let obj = {
        "back-log": 0,
        0: "back-log",
        todo: 1,
        1: "todo",
        doing: 2,
        2: "doing",
        done: 3,
        3: "done"
      };
      let current = obj[this.todo.status];
      let newCurrent = current - 1;
      console.log(newCurrent);
      let newStatus = obj[newCurrent];
      console.log(newStatus);
      db.collection("todo")
        .doc(this.todo.id)
        .update({
          status: newStatus
        });
    }
  }
};
</script>

