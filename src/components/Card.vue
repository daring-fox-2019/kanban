<template>
    <div lass="card border-primary mb-3" style="max-width: 18rem;">
      <div class="card border-primary mb-3" style="max-width: 18rem;">
            <div v-bind:class= "'card-header ' + color">{{card}}</div>
              <div class="card-body text-primary">
                <div v-for="task in tasks" :key="task.id">
                    <Task v-bind:task="task" v-bind:card="card" />
                </div>
              </div>
          </div>
        </div>
        
        
</template>

<script>
import Task from './Task'
export default {
    data () {
      return {
        color : 'bg-danger'
      }
    },
    props : ['card','tasks'],
    components : {
        Task
    },
    mounted () {
        console.log(this.card)
        if (this.card == 'Back-Log') {
          this.color = 'bg-danger'
        }
        else if (this.card == 'To-Do') {
          this.color = 'bg-primary'
        }
        else if (this.card == 'Doing') {
          this.color = 'bg-warning'
        }
        else if (this.card == 'Done') {
          this.color = 'bg-success'
        }
    }
}
</script>

<style>

</style>
