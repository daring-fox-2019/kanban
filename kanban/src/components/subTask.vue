<template>
  <div>
    <draggable class="list-group" :list="tasks"  @change="log($event)" :options="{ group : 'kanban'}">

    <v-card v-for="(task,i) in tasks" :key="i">
      <v-container grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="blue-grey darken-2" class="white--text">
              <div class="container pa-4">
                <div class="headline">
                  <b>{{task.title}}</b>
                </div>
                <p style="padding-top:10px">
                  <b>desc :</b>
                  {{task.description}}
                </p>
                <p>
                  <b>point :</b>
                  {{task.point}}
                </p>
                <p>
                  <b>assign to :</b>
                  {{task.assignedto}}
                </p>
                <p v-if="task.createdBy">
                  <b>created by :</b>
                  {{task.createdBy}}
                </p>
              </div>

              <v-card-actions class="pa-4">
                <modalDetail :name="basic.name" :id="task.key" :task="task"></modalDetail>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    </draggable>

  </div>
</template>

<script>
import modalDetail from "../components/modalDetail.vue";
import db from "@/database/firebase.js";
import draggable from 'vuedraggable';

export default {
  props: ["basic", "id"],
  data() {
    return {
      tasks: [],
      keys: []
    };
  },
  methods: {
    log: function(evt) {
      if(evt.added){
        let kanbansRef = db.ref(`kanban/${evt.added.element.key}`);
          kanbansRef.update({ status: this.basic.name });
      }
    }
  },
  mounted() {
    let kanbansRef = db.ref().child("kanban");

    kanbansRef.on("value", data => {
      this.keys = [];
      this.tasks = [];

      this.keys = Object.keys(data.val());

      this.keys.map(el => {
        if (data.val()[el].status == this.basic.name) {
          let newData = { ...data.val()[el], key: el };
          this.tasks.push(newData);
        }
      });
    });
  },
  components: {
    modalDetail,
    draggable
  }
};
</script>

