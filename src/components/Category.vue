<template>
  <div
    style="max-width: 400px; margin: auto;"
    class="grey lighten-3 mb-5"
  >
    <v-toolbar
      v-bind:color="colorType"
      dark
    >
    <v-toolbar-title>{{status}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <div class='content'>
      <draggable v-model="tasks" group="people" @start="drag=true" @end="drag=false" @add="addItem">
        <Task v-for="(task,i)  in tasks" :task="task" :key="i"></Task>
      </draggable>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'
import draggable from 'vuedraggable'
import db from '@/api/apiFireStore.js'

export default {
    name: 'Category',
    props: ['status', 'tasks'],
    components: {
        Task,
        draggable,
    },
    computed: {
        colorType: function() {
            let color
            switch(this.status.toLowerCase()) {
                case 'backlog':
                    color = 'red'
                    break;
                case 'todo':
                    color = 'orange'
                    break;
                case 'doing':
                    color = 'blue'
                    break;
                case 'done':
                    color = 'green'
                    break;
                default:
                    color = 'grey' 
            }

            return color
        }
    },
    methods: {
      addItem (e) {
        console.log(this.$props.status);
        let newStatus = this.$props.status.toLowerCase();
        db.doc(`tasks/${e.item._underlying_vm_.id}`).update({ status:  newStatus})
          .then(() => {
            console.log('updated successfully!!')
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
}
</script>

<style scoped>
.content {
    background: white;
    padding: 20px 10px;
    border: 1px solid gainsboro;
}


</style>
