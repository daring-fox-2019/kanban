<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <PanelCard :title="'BackLog'" :cover="items[0].src"/>
        <PanelCard :title="'Todo'" :cover="items[1].src"/>
        <PanelCard :title="'Doing'" :cover="items[2].src"/>
        <PanelCard :title="'Done'" :cover="items[3].src"/>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PanelCard from '@/components/PanelCard.vue';

export default {
  name: 'home',
  components: {
    PanelCard,
  },
  data: () => ({
    items: [
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
      },
      {
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
      },
    ],
  }),
};
</script>
