<template>
  <div class="home">
    <MainHeader></MainHeader>
    <div class="container">
      <div class="container-card">
        <KanbanCard v-for="(data,index) in taskLists" :key="index" :data="data"></KanbanCard>
      </div>
    </div>
  </div>
</template>
<script>

// @ is an alias to /src
import MainHeader from '@/components/MainHeader.vue';
import KanbanCard from '@/components/KanbanCard.vue';

import database from '../assets/config'

const taskData = [
  {
    name: 'Pre-Log',
    data: []
  },
  {
    name: 'To-Do',
    data: []
  },
  {
    name: 'On-Going',
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
    if (childSnapshot.val().status === 'Pre-Log') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[0].data.push(obj)
    } else if (childSnapshot.val().status === 'To-Do') {
      const obj = childSnapshot.val()
      obj.id = childSnapshot.key
      taskData[1].data.push(obj)
    } else if (childSnapshot.val().status === 'On-Going') {
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
    MainHeader,
    KanbanCard
  },
  data(){
    return {
      taskLists:taskData
    }
  }
};
</script>

<style>
body{
  font-family: 'Kodchasan', sans-serif;
}
.container-card {
  margin-top: 30px;
  padding-top: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 90%;
  grid-gap: 20px;
}
.container {
  background-color: #19647e;
  width: 100%;
  min-height: 675px;
}
@media only screen and (max-width: 800px) {
  .container-card {
    display: block;
  }
}
</style>
