<template>
  <div>
    <MainHeader/>
    <div
      class="row d-flex justify-content-between"
      style="margin: 0 auto; padding: 100px;"
    >
      <div class="col-3" v-for="(task, index) in taskLists" :key="index">
        <KanbanCard v-bind:status="task.status" />
      </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from '@/components/KanbanCard.vue';
import MainHeader from '@/components/MainHeader.vue';

const taskData = [
  {
    status: 'Pre-Log',
    tasks: [],
  },
  {
    status: 'To-Do',
    tasks: [],
  },
  {
    status: 'On-Going',
    tasks: [],
  },
  {
    status: 'Finished',
    tasks: [],
  },
];

export default {
  data() {
    return {
      taskLists: taskData,
    };
  },
  components: {
    KanbanCard,
    MainHeader,
  },
  methods: {},
  created() {},
  mounted() {},
};
</script>

<style>
</style>
