<template>
  <div class="home">
    <InputMain/>
    <div class="container">
      <div class="container-card">
        <ColumnKanban v-for="(tasktype,index) in taskLists" :key="index" :tasktype="tasktype"/>
      </div>
    </div>
  </div>
</template>

<script>
import InputMain from '@/components/Input.vue'
import ColumnKanban from '@/components/Column.vue'
import db from '../assets/config.js'

export default {
  name: 'home',
  components: {
    InputMain,
    ColumnKanban
  },
  data: function () {
    return {
      taskLists: []
    }
  },
  methods: {},
  created () {
  },
  mounted () {
    db.collection('todos')
      .onSnapshot((querySnapshot) => {
        var tempList = []
        querySnapshot.forEach((doc) => {
          tempList.push(doc.data())
        })
        const taskData = [
          {
            name: 'Wacana',
            data: []
          },
          {
            name: 'Rencana',
            data: []
          },
          {
            name: 'On-Going',
            data: []
          },
          {
            name: 'Selesai',
            data: []
          }
        ]
        tempList.forEach(function (task) {
          for (let i = 0; i < taskData.length; i++) {
            if (taskData[i].name === task.status) {
              taskData[i].data.push(task)
            }
          }
        })
        this.taskLists = taskData
      })
  }
}
</script>

<style>
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
  background-color: #f6f7f9;
  width: 100%;
  min-height: 675px;
}
</style>
