<template>
  <div class="col">
    <div class="card">
      <div :class="['card-header', bg,'text-white']">{{ category }}</div>
      <div class="card-body">
        <Task v-for="task in tasks" :cat="category" :task="task" :key="task.title"/>
      </div>
    </div>
  </div>
</template>

<script>
import Task from '@/components/Task.vue';

export default {
  data() {
    return {};
  },
  props: ['bg', 'category', 'tasks'],
  components: {
    Task,
  },
  mounted: {
    // getTasks() {
    //   db.collection("Back-Log").onSnapshot(function(doc) {
    //     this.backlog = doc.data();
    //   });
    //   db.collection("To-Do").onSnapshot(function(doc) {
    //     this.todo = doc.data();
    //   });
    //   db.collection("Doing").onSnapshot(function(doc) {
    //     this.doing = doc.data();
    //   });
    //   db.collection("Done").onSnapshot(function(doc) {
    //     this.done = doc.data();
    //   });
    // }
  },
};
</script>
