<template>
  <div class="card">
    <h2>{{data.name}}</h2>
    <ContentCard v-for="(item) in data.data" :key="item.id" :item="item" :name="data.name"></ContentCard>
  </div>
</template>

<script>
import ContentCard from '@/components/ContentCard.vue'
import { constants } from 'crypto';
export default {
  name: 'KanbanCard',
  components: {
    ContentCard
  },
  data: function () {
    return {}
  },
  props: ['data'],
  created () {
  }
}
</script>

<style scoped>
.card {
  font-size: 10px;
  color: #28AFB0;
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
