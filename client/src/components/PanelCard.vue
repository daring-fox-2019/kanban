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
        <div>
          <h3 class="headline mb-0">4 assignments</h3>
          <v-layout row wrap>
            <TaskCard :title="'Ini Judul'" v-for="i in 4" :key="i"/>
          </v-layout>
        </div>
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
  },
  components: {
    TaskCard,
  },
  data: () => ({

  }),
};
</script>
