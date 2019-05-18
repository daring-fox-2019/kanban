<template>
  <v-flex class="pa-1" sm3>
    <v-card>
      <v-img
        class="white--text"
        height="100px"
        :src="cover"
      >
        <v-container fill-height fluid>
          <v-layout fill-height>
            <v-flex xs12 align-end flexbox>
              <span class="headline">{{ title }}</span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-img>
      <v-card-title>
        <h3 class="headline mb-0">{{ getTotal }} assignment{{ plural }}</h3>
        <v-layout row wrap>
          <v-flex sm12>
            <TaskCard v-for="(task, index) in panel.tasks" :key="index" :task="task"/>
          </v-flex>
        </v-layout>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue';

export default {
  name: 'panelCard',
  props: {
    title: String,
    cover: String,
    panel: Object,
  },
  components: {
    TaskCard,
  },
  computed: {
    getTotal() {
      return this.panel.tasks.length;
    },
    plural() {
      return this.getTotal > 1 ? 's' : '';
    },
  },
  data: () => ({

  }),
};
</script>
