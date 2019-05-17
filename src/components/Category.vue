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
        <Task v-for="(task,i)  in tasks" :task="task" :key="i"></Task>
    </div>
  </div>
</template>

<script>
import Task from './Task.vue'

export default {
    name: 'Category',
    props: ['status', 'tasks'],
    components: {
        Task,
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
