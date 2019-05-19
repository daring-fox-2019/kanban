<template>
  <v-container>
    <v-flex>
      <v-card dark :color="panel.color" style="width:250px;">
        <v-card-text class="">{{panel.text}}</v-card-text>
      </v-card>

      <v-flex class="my-3" v-for="task in panel.task" :key="task.id">
        <TaskCard :task="task"/>
      </v-flex>
    </v-flex>
  </v-container>
</template>

<script>

import TaskCard from '@/components/TaskCard.vue'

export default {
  props: ['panel'],
  data () {
    return {
    }
  },
  components: {
    TaskCard
  }
}
</script>