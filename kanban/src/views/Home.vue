<template>
  <div class="home">
    <navbar/>
    <addTask/>
    <!-- <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <div class="jumbotron d-flex justify-content-center" style="background: none">
      <div v-for="panel in panels" :key="panel.text">
        <statusCard style="margin: 0 10px" :panel="panel"/>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { db } from '@/firebase/firebase.js'
import { functions } from 'firebase'
import statusCard from '../components/statusCard'
import navbar from '../components/navbar'
import addTask from '../components/addTask'

export default {
  name: 'home',
  data(){
    return {
      panels : [
    {
      text: 'Back-Log',
      color: 'red'
    },
    {
      text : 'To-Do',
      color : 'orange',
    },
    {
      text : 'Doing',
      color : 'blue'
    },
    {
      text : 'Done',
      color : 'green'
    }],
    title : '',
    description: '',
    point: 0,
    assigned: '',
    tasks: []
    }
  },
  methods : {
    
  },
  components: {
    HelloWorld,
    statusCard,
    navbar,
    addTask
  },
  created () {
    
  }
}
</script>
