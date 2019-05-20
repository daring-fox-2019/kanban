<template>
  <div>
    <div
      class="tile is-child"
      v-for="(task, index) in tasks"
      :key="index">
      <TaskItem
        :task="task"
        :next-status="nextStatus"
        :prev-status="prevStatus">
      </TaskItem>
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue'

export default {
  name: 'TaskList',
  components: {
    TaskItem
  },
  props: {
    tasks: {
      type: Array,
      required: true
    },
    nextStatus: {
      type: Object,
      required: false
    },
    prevStatus: {
      type: Object,
      required: false
    }
  }
}
</script>

<style>

</style>
