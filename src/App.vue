<template>
  <div class="main">
    <Form />
    <div class="ui four column grid" style="margin-top: 3rem;">
      <Segment v-for="(data, index) in taskList" :key="index" :data="data"/>
    </div>
  </div>
</template>

<script>
import Segment from '@/components/Segment.vue';
import Form from '@/components/Form.vue';
import database from '@/firebase/init';

const taskData = [
  {
    name: 'Idea',
    tasks: [],
  },
  {
    name: 'Todo',
    tasks: [],
  },
  {
    name: 'Doing',
    tasks: [],
  },
  {
    name: 'Finished',
    tasks: [],
  },
];

const leadsRef = database.ref('/');

leadsRef.on('value', (snapshot) => {
  taskData[0].tasks = [];
  taskData[1].tasks = [];
  taskData[2].tasks = [];
  taskData[3].tasks = [];
  snapshot.forEach((childSnapshot) => {
    if (childSnapshot.val().status === 'Idea') {
      const obj = childSnapshot.val();
      obj.id = childSnapshot.key;
      taskData[0].tasks.push(obj);
    } else if (childSnapshot.val().status === 'Todo') {
      const obj = childSnapshot.val();
      obj.id = childSnapshot.key;
      taskData[1].tasks.push(obj);
    } else if (childSnapshot.val().status === 'Doing') {
      const obj = childSnapshot.val();
      obj.id = childSnapshot.key;
      taskData[2].tasks.push(obj);
    } else {
      const obj = childSnapshot.val();
      obj.id = childSnapshot.key;
      taskData[3].tasks.push(obj);
    }
  });
});

export default {
  components: {
    Segment,
    Form,
  },
  data() {
    return {
      taskList: taskData,
    };
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Domine&display=swap');

html, body, h1, h2, h3, h4, h5 {
  font-family: 'Domine', serif;
}

.main {
  padding: 40px;
}
</style>
