<template>
  <div class="card">
    <h2> {{ tasktype.name }} </h2>
    <todo v-for="item in tasktype.data" :key="item.id" :item="item" :name="tasktype.name"/>
  </div>
</template>

<script>
import todo from '@/components/Todo.vue'
export default {
  name: 'column-kanban',
  components: {
    todo
  },
  data: function () {
    return {
      color: ''
    }
  },
  props: ['tasktype'],
  created () {
    console.log('creating column', this.tasktype.name)
  },
  mounted () {
  }
}
</script>

<style scoped>
.card {
  font-size: 10px;
  width: 100%;
  min-height: 400px;
  height: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
}
.card h2 {
  padding: 20px;
}
</style>
