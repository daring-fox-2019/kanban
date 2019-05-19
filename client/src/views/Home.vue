<template>
  <div id="home" class="container">
    <Navbar/>
    <div class="row">
      <Category
        v-for="(category,categoryname,index) in categories"
        :category="categoryname"
        :bg="category.bg"
        :tasks="category.tasks"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import db from '@/firebase/db.js';
import Category from '@/components/Category.vue';
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'home',
  components: {
    Category,
    Navbar,
  },
  data() {
    return {
      categories: {
        'Back-Log': {
          bg: 'bg-danger',
          tasks: [],
        },
        'To-Do': {
          bg: 'bg-warning',
          tasks: [],
        },
        Doing: {
          bg: 'bg-primary',
          tasks: [],
        },
        Done: {
          bg: 'bg-success',
          tasks: [],
        },
      },
    };
  },
  methods: {
    lewatGak(due) {
      if (due.toDate().getTime() > Date.now()) {
        return true;
      } return false;
    },
  },
  mounted() {
    db.collection('Back-Log').onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
            lewat: this.lewatGak(snapshot.docs[i].data().due),
          });
        }
        this.categories['Back-Log'].tasks = temp;
        console.log(this.categories['Back-Log']);
      },
      (error) => {
        // ...
      },
    );
    db.collection('To-Do').onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
            lewat: this.lewatGak(snapshot.docs[i].data().due),
          });
        }
        this.categories['To-Do'].tasks = temp;
      },
      (error) => {
        // ...
      },
    );
    db.collection('Doing').onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
            lewat: this.lewatGak(snapshot.docs[i].data().due),
          });
        }
        this.categories.Doing.tasks = temp;
      },
      (error) => {
        // ...
      },
    );
    db.collection('Done').onSnapshot(
      (snapshot) => {
        const temp = [];
        for (let i = 0; i < snapshot.docs.length; i++) {
          temp.push({
            id: snapshot.docs[i].id,
            ...snapshot.docs[i].data(),
            lewat: this.lewatGak(snapshot.docs[i].data().due),
          });
        }
        this.categories.Done.tasks = temp;
      },
      (error) => {
        // ...
      },
    );
  },
};
</script>
