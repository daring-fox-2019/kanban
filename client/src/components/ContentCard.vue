<template>
  <div>
    <div v-for="(todo, index) in todos" :key="index">
      <div
        style="border: solid 0.5px;; border-color: #DFDFDF;"
        class="card-body"
        v-if="status === todo.status"
      >
        <h5 class="card-title">{{ todo.title }}</h5>
        <p class="card-text">{{ todo.description }}</p>
        <h6>Assigned to: {{ todo.assignedTo }}</h6>
        <br>
        <div class="row d-flex justify-content-between">
          <button
            v-if="todo.status !== 'Pre-Log'"
            @click="back(todo)"
            class="btn btn-warning"
            type="submit"
          >Back</button>
          <button @click="remove(todo.id)" class="bt btn-danger" type="submit">Delete</button>
          <button
            v-if="todo.status !== 'Finished'"
            @click="next(todo)"
            class="btn btn-success"
            type="submit"
          >Next</button>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import db from '@/api/api';

export default {
  props: ['status'],
  data() {
    return {
      todos: [],
    };
  },
  created() {
    db.collection('todos').onSnapshot((docs) => {
      this.todos = [];
      docs.forEach((element) => {
        this.todos.push({ ...element.data(), id: element.id });
      });
    });
  },
  methods: {
    back(todo) {
      if (todo.status === 'Finished') todo.status = 'On-Going';
      else if (todo.status === 'On-Going') todo.status = 'To-Do';
      else if (todo.status === 'To-Do') todo.status = 'Pre-Log';
      db.collection('todos')
        .doc(todo.id)
        .set({
          title: todo.title,
          description: todo.description,
          status: todo.status,
          assignedTo: todo.assignedTo,
        });
    },
    next(todo) {
      if (todo.status === 'Pre-Log') todo.status = 'To-Do';
      else if (todo.status === 'To-Do') todo.status = 'On-Going';
      else if (todo.status === 'On-Going') todo.status = 'Finished';
      db.collection('todos')
        .doc(todo.id)
        .set({
          title: todo.title,
          description: todo.description,
          status: todo.status,
          assignedTo: todo.assignedTo,
        });
    },
    remove(id) {
      db.collection('todos')
        .doc(id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
  },
};
</script>
