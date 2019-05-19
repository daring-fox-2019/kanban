<template>
  <div class="home">
    <navbar></navbar>
    <br>
    <br>
    <br>
      <div class="container-fluid">
       <div class="row">
       <div class="col-11 mx-auto d-flex justify-content-between">
        <kanbancard v-for="(data,index) in taskLists" :key="index" :data="data"></kanbancard>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import navbar from '@/components/navbar.vue'
import kanbancard from '@/components/kanbancard.vue'


import database from '@/api/config.js'

const taskData = [
  {
    name: 'BackLog',
    data: []
  },
  {
    name: 'ToDo',
    data: []
  },
  {
    name: 'OnGoing',
    data: []
  },
  {
    name: 'Finished',
    data: []
  }
]
var leadsRef = database.ref('/')
leadsRef.on('value', function (snapshot) {
  taskData[0].data = []
  taskData[1].data = []
  taskData[2].data = []
  taskData[3].data = []
  snapshot.forEach(function (childSnapshot) {
    if (childSnapshot.val().status === 'BackLog') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[0].data.push(obj)
    } else if (childSnapshot.val().status === 'ToDo') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[1].data.push(obj)
    } else if (childSnapshot.val().status === 'OnGoing') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[2].data.push(obj)
    } else {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[3].data.push(obj)
     
    }
  })
})

export default {
  name: 'home',
  components: {
    navbar,
    kanbancard
  },
  data: function () {
    return {
      taskLists: taskData
    }
  },
  methods: {},
  created () {},
  mounted () {}
}
</script>

<style>

</style>
