<template>
  <div>
     <div id="nav" class="justify-space-between align-center">
      <h1>Kanban</h1>
      <AddTask />
      <v-btn color="secondary" dark large @click="logout">Logout</v-btn>
    </div>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12 md6 lg3 px-1> <CardTask :basic="{color:'red',name:'Backlog'}"></CardTask> </v-flex>
            <v-flex xs12 md6 lg3 px-1> <CardTask :basic="{color:'orange',name:'Todo'}"></CardTask> </v-flex>
            <v-flex xs12 md6 lg3 px-1> <CardTask :basic="{color:'blue',name:'Doing'}"></CardTask> </v-flex>
            <v-flex xs12 md6 lg3 px-1> <CardTask :basic="{color:'green',name:'Done'}"></CardTask> </v-flex>
        </v-layout>
    </v-container>
  </div>
</template>

<script>
import CardTask from '@/components/cardTask.vue'
import AddTask from '@/components/AddTaskModal.vue'

export default {
    components : {
        CardTask,
        AddTask
    },
    methods: {
      logout(){
        localStorage.clear()
        this.$router.push('/login')
      }
    }
}
</script>

