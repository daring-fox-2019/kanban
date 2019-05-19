<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{ task.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">Assignee : {{ task.assignee }}</h6>
      <p class="card-text">{{ task.description }}</p>
      <p :class="['card-text', task.lewat ? 'text-success' : 'text-danger']">{{ dueShow }}</p>
      <div class="form-group">
        <label for="exampleFormControlSelect1">Move To :</label>
        <select class="form-control" @change="onChange($event)" id="exampleFormControlSelect1">
          <option :selected="category==='Back-Log'">Back-Log</option>
          <option :selected="category==='To-Do'">To-Do</option>
          <option :selected="category==='Doing'">Doing</option>
          <option :selected="category==='Done'">Done</option>
        </select>
      </div>
      <a @click.prevent="editTask" href="#" class="card-link">Edit</a>
      <a @click.prevent="deleteTask" href="#" class="card-link">Delete</a>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/db.js';
import EventBus from '@/EventBus';

export default {
  props: ['cat', 'task'],
  data() {
    return {
      category: this.cat,
      // task: {
      //   id: this.tugas.id,
      //   title: this.tugas.title,
      //   assignee: this.tugas.assignee,
      //   description: this.tugas.description,
      //   due: this.tugas.due,
      //   dueShow: this.dateID(this.tugas.due.toDate()),
      // },
      // lewat: false,
    };
  },
  computed: {
    dueShow() {
      return this.dateID(this.task.due.toDate());
    },
  },
  mounted() {
    // console.log(`${this.task.due.toDate().getTime()}======${Date.now()}`);
    // if (this.task.due.toDate().getTime() > Date.now()) {
    //   this.lewat = true;
    // } else this.lewat = false;
  },
  methods: {
    // lewatSekarang(){
    //   console.log(this.tugas.due.toDate().getTime()+"======"+Date.now())
    //   if(this.tugas.due.toDate().getTime() > Date.now()){
    //     return true
    //   }
    //   else return false
    // },
    dateID(date) {
      const options = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      };
      return date.toLocaleDateString('id-ID', options);
    },
    editTask() {
      EventBus.$emit('editing', this.category, this.task);
    },
    deleteTask() {
      db.collection(this.category)
        .doc(this.task.id)
        .delete()
        .then(() => {
          console.log('Document successfully deleted!');
        })
        .catch((error) => {
          console.error('Error removing document: ', error);
        });
    },
    onChange(event) {
      console.log(`${this.category}========${event.target.value}`);
      this.deleteTask();
      this.category = event.target.value;
      db.collection(this.category)
        .doc(this.task.id)
        .set({
          title: this.task.title,
          assignee: this.task.assignee,
          description: this.task.description,
          due: this.task.due,
        })
        .then(() => {
          console.log('Document successfully written!');
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
        });
    },
  },
};
</script>
