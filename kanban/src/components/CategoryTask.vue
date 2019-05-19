<template>
  <div>
    <b-card
      header-tag="header"
      footer-tag="footer"
      style="width:280px; color: white;"
      :header-bg-variant="variant"
    >
      <h6 slot="header" class="mb-0">{{ headertest }}</h6>
      <draggable v-model="list" :group="{name:'task'}" :sortable="false" @change="addEvent">
        <Task v-for="(task, index) in list" :key="index" :detail="task" style="cursor: pointer"/>
      </draggable>
    </b-card>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import Task from "@/components/Task.vue";
import db from "@/api/api";

export default {
  props: ["headertest", "list", "variant"],
  name: "task",
  components: {
    Task,
    draggable
  },
  data() {
    return {};
  },
  methods: {
    addEvent(evt) {
      if (evt.added) {
        let idTask = evt.added.element.id;

        db.collection("task")
          .doc(idTask)
          .set({ status: this.headertest }, { merge: true })
          .then(() => {
            console.log("update successfully");
          })
          .catch(err => {
            console.log(err);
          });
        this.list[0].status = this.headertest;
        console.log(this.list);
      }
    }
  }
};
</script>

<style scoped>
.card {
  margin: 0 10px;
}
.card-body {
  padding: 10px;
}
</style>
