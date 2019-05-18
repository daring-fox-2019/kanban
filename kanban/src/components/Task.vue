<template>
  <div id="kotakecil">
    <h3>{{todoname}}</h3>
    <h5>Priority : {{priority}} </h5>
    <h5 id="bawah">Assigned to : {{assignedto}} </h5>
    <!-- <button :info="{ detil }">Show detail</button> -->
    <Showdetail :info="{ detil }" />
  </div>
</template>

<script>
import Showdetail from '@/components/detail.vue';

export default {
  name: 'Task',
  props: ['todoname', 'priority', 'assignedto', 'detil'],
  components: {
    Showdetail,
  },
};

</script>

<style scoped>
  div#kotakecil {
    margin: 40px 20px;
  }
  h5#bawah{
    margin-bottom: 15px;
  }
</style>
