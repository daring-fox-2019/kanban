<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <PanelCard
          v-for="(panel, index) in panelCards"
          :panel="panel"
          :key="index"
          :title="panel.header" :cover="panel.src"/>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import PanelCard from '@/components/PanelCard.vue';
import db from '@/api/firebase';

export default {
  name: 'home',
  components: {
    PanelCard,
  },
  created() {
    this.initiate();
  },
  data: () => ({
    panelCards: [
      {
        header: 'BackLog',
        src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
        tasks: [],
      },
      {
        header: 'Todo',
        src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg',
        tasks: [],
      },
      {
        header: 'Doing',
        src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg',
        tasks: [],
      },
      {
        header: 'Done',
        src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg',
        tasks: [],
      },
    ],
  }),
  methods: {
    initiate() {
      db
        .collection('tasks')
        .orderBy('point', 'desc')
        .onSnapshot((querySnapshot) => {
          console.log('data changed');
          /* eslint no-param-reassign: ["error", { "props": false }] */
          this.panelCards.map((card) => {
            card.tasks = [];
            return card;
          });
          querySnapshot.forEach((doc) => {
            switch (doc.data().status) {
              case 'BackLog':
                this.panelCards[0].tasks.push(doc);
                break;
              case 'Todo':
                this.panelCards[1].tasks.push(doc);
                break;
              case 'Doing':
                this.panelCards[2].tasks.push(doc);
                break;
              case 'Done':
                this.panelCards[3].tasks.push(doc);
                break;
              default:
                break;
            }
          });
        });
    },
  },
};
</script>
