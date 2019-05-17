<template>
  <div class="main-header">
    <form @submit.prevent="sendItem">
      <input type="text" placeholder="Add new task" v-model="taskName" >
    </form >
  </div>
</template>

<script>
import database from '@/firebase/init';

export default {
  name: 'Form',
  data() {
    return {
      taskName: '',
    };
  },
  methods: {
    sendItem() {
      database.ref('/').push({
        title: this.taskName,
        status: 'Idea',
      });
      this.taskName = '';
    },
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  overflow-x: hidden;
}
h1,
h2,
h3 {
  padding: 0;
  margin: 0;
}
.main-header i {
  font-size: 20px;
  color: #4684f6;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  display: block;
  cursor: pointer;
}
.main-header input {
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
}
input {
  height: 30px;
  width: 300px;
  outline: none;

}
input[type=text] {
  border: none;
  border-bottom: 1px solid black;
}
</style>
