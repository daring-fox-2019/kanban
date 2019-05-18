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
        <v-container fluid>
          <h3 class="headline mb-0">{{ getTotal }} assignment{{ plural }}</h3>
          <v-layout row>
            <v-flex sm12>
              <p
                style="text-align:center"
                class="mt-4 grey--text"
              >
                Drag task here
                <br><v-icon>arrow_downward</v-icon>
              </p>
              <draggable
                style="min-height:25px"
                @change="handleEvent"
                group="tasks"
                v-model="panel.tasks"
              >
                <TaskCard v-for="(task, index) in panel.tasks" :key="index" :task="task"/>
              </draggable>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-title>
    </v-card>
  </v-flex>
</template>

<script>
import TaskCard from '@/components/TaskCard.vue';
import draggable from 'vuedraggable';
import db from '@/api/firebase';

export default {
  name: 'panelCard',
  props: {
    title: String,
    cover: String,
    panel: Object,
  },
  components: {
    draggable,
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
  methods: {
    handleEvent(event) {
      const { added } = event;
      if (added) {
        const taskId = added.element.id;
        db
          .collection('tasks')
          .doc(taskId)
          .update({
            status: this.title,
          })
          .then(() => {
            // console.log('Document updated');
          })
          .catch((error) => {
            console.error('Error updating document: ', error);
          });
      }
    },
  },
};
</script>
