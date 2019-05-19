<template>
    <div class="card">
        <ContentCard  v-for="(item) in data" :key="item.id" :item="item">
        </ContentCard>
    </div>
</template>

<script>

import ContentCard from '../components/ContentCard'

export default {
    name: 'KanbanCard',
    components: {
        ContentCard
    },
    data() {
        return {
           
        }
    },
    props : ['data'],
    created() {
        this.cardTitle = this.title
    },
}
</script>

<style scoped>
.card {
  font-size: 10px;
  color: #4684f6;
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