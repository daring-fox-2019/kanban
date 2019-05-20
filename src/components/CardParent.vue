<template>
  <v-flex>
    <draggable class="list-group" :list="tasks" group="tasks" @change="log">
      <div class="list-group-item">
        <v-card class="mx-2 parentCard">
          <v-card-title primary-title :class="cardType.statusColor+'--text'">
            <div>
              <h3 class="title mb-0">{{cardType.title}}</h3>
            </div>
          </v-card-title>
          <v-card-text>
            <draggable v-model="tasks">
              <div v-for="task in tasks" :key="task.id">
                <CardChild :task="task" :childclass="cardType.title"/>
              </div>
            </draggable>
          </v-card-text>
        </v-card>
      </div>
    </draggable>
  </v-flex>
</template>

<script>
import CardChild from "@/components/CardChild";
import db from "@/firebase/db.js";
import draggable from "vuedraggable";
export default {
  data() {
    return {
      users: [],
      tasks: null
    };
  },
  props: {
    cardType: Object
  },
  components: {
    CardChild,
    draggable
  },
  watch: {
    cardType: {
      immediate: true,
      handler(cardType) {
        this.$bind(
          "tasks",
          db.collection("tasks").where("status", "==", cardType.ref)
        ).then(data => {
          this.tasks = data;
        });
      }
    }
  },
  mounted() {
    console.log(this.tasks);
  },
  methods: {
    log(evt) {
      console.log(evt);
    }
  }
};
</script>

<style>
.parentCard {
  border-radius: 20px 0;
  max-width: 300px;
}
</style>
