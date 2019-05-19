<template>
  <div>
    <div class="card" >
      <div class="card-header" :class="color">{{ title }}</div>
      <div class="card-body">
          <!-- {{ todoTask.task }} -->
          <papan-task-detail
          @dariAppDone="done"
          @dariAppInProgress="inProgress"
          @dariAppTodo="todo"
          @dariAppBackLog="backLog"
          @dariAppDelete="deleteTask"
          :dataTask="dataTask"
          @dariPapanCurrentTask="currentTask"
          v-bind:todotaskdetail="todoTask.task"
          />
      </div>
    </div>
  </div>
</template>

<script>
import PapanTaskDetail from '@/components/papandetail.vue';

export default {
  name: 'papanTask',
  props: ['todoTask', 'title', 'color', 'dataTask'],
  components: {
    PapanTaskDetail,
  },
  methods: {
    done(id) {
      this.$emit('dariAppDone', id);
    },
    inProgress(id) {
      this.$emit('dariAppInProgress', id);
    },
    backLog(id) {
      this.$emit('dariAppBackLog', id);
    },
    deleteTask(id) {
      this.$emit('dariAppDelete', id);
    },
    todo(id) {
      this.$emit('dariAppTodo', id);
    },
    currentTask(data) {
      this.$emit('dariAppcurrentTask', data);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card{
    width: 280px;
}
.red{
    width: 100%;
    font-size: 24px;
    color: antiquewhite;
    background-color: #DC3545;
}
.orange{
    font-size: 24px;
    color: antiquewhite;
    background-color: #FFC107;
}
.green{
    font-size: 24px;
    color: antiquewhite;
    background-color:#28A745;
}
.blue{
    font-size: 24px;
    color: antiquewhite;
    background-color:#17A2B8;
}
</style>
