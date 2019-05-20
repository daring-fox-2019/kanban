<template>
    <div class="d-flex justify-content-around flex-wrap">
    <div v-for="(board, index) in boards" :key="index">
      <div class="card m-3" style="width: 18rem">
        <div class="card-header font-weight-bold text-white" :style="{'background-color': colors[index]}"> {{ board }} </div>
        <div class="card-body">
          <CardContent v-for="(task, index) in tasks" :key="index" :taskContent="task" :status="board"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardContent from "@/components/card.vue";
export default {
  props: ["tasks"],
  components : {
  CardContent
  },
  data() {
    return {
      boards: ['Back-Log', 'To-Do', 'Doing', 'Done'],
      colors: ['#f30', '#f90', '#39f', '#0c6']
    };
  }
};
</script>

<style>
</style>
