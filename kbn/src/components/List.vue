<template>
  <v-flex xs12 md6 lg3 px-1 >
      <v-card>
        <v-card-title primary-title :class="'title-' + process" >
          <div class="text-uppercase black--text">
            {{process}}
          </div>
        </v-card-title>
           <draggable v-model="ownTask"  :group="{ name: 'task'}"
            @start="drag=true" @end="drag=false" @change="dragged($event)">
            <TaskCard v-for="task in ownTask" :key="task.id" :task="task" />
          </draggable>
      </v-card>
  </v-flex>
</template>

<script>
import draggable from 'vuedraggable';
import firebase from '@/database/firebase';
import TaskCard from '@/components/TaskCard.vue';

const dbRef = firebase.collection('tasks');

export default {
  name: 'List',
  components: {
    draggable,
    TaskCard,
  },
  props: {
    process: {
      type: String,
    },
    tasks: {
      type: Array,
    },
    statId: {
      type: Number,
    },
  },
  data() {
    return {
      ownTask: [],
    };
  },
  methods: {
    dragged(event) {
      if (event.added) {
        const { id } = event.added.element;
        dbRef.doc(id)
          .update({ status: this.statId });
      }
    },
  },
  watch: {
    tasks(value) {
      this.ownTask = value;
    },
  },
};
</script>

<style scoped>
  .title-backlog{
    background-color: #FF3400;
  }
  .title-todo{
    background-color: #FF9800;
  }
  .title-doing{
    background-color: #3399FE;
  }
  .title-done{
    background-color: #04CB66;
  }
</style>
