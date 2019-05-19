<template>
        <div class="card col-3">
          <div :class="data.name">
              <h3 class="text-light p-4">{{data.name}}</h3>
          </div>
          <div class="card-body">
         <isi v-for="(item) in data.data" :key="item.id" :item="item" :name="data.name"></isi>
          </div>
        </div>
</template>

<script>
import isi from '@/components/isi.vue'
export default {
  name: 'kanbancard',
  components: {
    isi
  },
  data: function () {
    return {}
  },
  props: ['data'],
  created () {
    this.cardTitle = this.title
  }
}
</script>
<style scoped>
.BackLog{
  background-color: #292F6C;

}
.ToDo{
  background-color: #4564B0;

}
.OnGoing{
  background-color:#56A7AF;

}
.Finished{
  background-color:#6AC19E;

}
</style>
