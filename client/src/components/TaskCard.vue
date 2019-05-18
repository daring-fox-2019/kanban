<template>
  <v-card class="my-3">
    <v-card-title>
      <div>
        <h3 class="headline mb-0">{{ dTask.title }}</h3>
        <h6 class="subheading">Point:</h6>
        <p>{{ dTask.point }}</p>
        <h6 class="subheading">PIC:</h6>
        <p>{{ dTask.pic }}</p>
      </div>
    </v-card-title>
    <v-card-actions>
      <v-layout row justify-center>
        <v-btn @click="prev" :disabled="backDisable" icon flat color="success">
          <v-icon>arrow_back</v-icon>
        </v-btn>
        <v-btn @click="remove" icon flat color="red">
          <v-icon>delete</v-icon>
        </v-btn>
        <v-btn @click="next" :disabled="nextDisable" icon flat color="success">
          <v-icon>arrow_forward</v-icon>
        </v-btn>
      </v-layout>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? 'keyboard_arrow_up' : 'keyboard_arrow_down' }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-slide-y-transition>
      <v-card-text v-show="show">
        <h6 class="subheading">Description:</h6>
        <p>{{ dTask.description }}</p>
      </v-card-text>
    </v-slide-y-transition>
  </v-card>
</template>

<script>
import db from '@/api/firebase';
import Swal from 'sweetalert2';

export default {
  name: 'taskCard',
  props: {
    task: Object,
  },
  computed: {
    dTask() {
      return {
        title: this.task.data().title,
        status: this.task.data().status,
        description: this.task.data().description || '-',
        point: this.task.data().point || 0,
        pic: this.task.data().pic || '-',
      };
    },
  },
  created() {
    this.disableCheck();
  },
  data: () => ({
    show: false,
    backDisable: false,
    nextDisable: false,
  }),
  methods: {
    disableCheck() {
      if (this.dTask.status.toLowerCase() === 'backlog') {
        this.backDisable = true;
      }
      if (this.dTask.status.toLowerCase() === 'done') {
        this.nextDisable = true;
      }
    },
    next() {
      let updatedStatus = null;
      switch (this.dTask.status.toLowerCase()) {
        case 'backlog':
          updatedStatus = 'ToDo';
          break;
        case 'todo':
          updatedStatus = 'Doing';
          break;
        case 'doing':
          updatedStatus = 'Done';
          break;
        default:
          break;
      }
      db.collection('tasks').doc(this.task.id).update({
        status: updatedStatus,
      })
        .then(() => {
          console.log('Document updated');
          // this.initiate();
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    },
    prev() {
      let updatedStatus = null;
      switch (this.dTask.status.toLowerCase()) {
        case 'todo':
          updatedStatus = 'BackLog';
          break;
        case 'doing':
          updatedStatus = 'ToDo';
          break;
        case 'done':
          updatedStatus = 'Doing';
          break;
        default:
          break;
      }
      db.collection('tasks').doc(this.task.id).update({
        status: updatedStatus,
      })
        .then(() => {
          console.log('Document updated');
          // this.initiate();
        })
        .catch((error) => {
          console.error('Error updating document: ', error);
        });
    },
    remove() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: 'green',
        cancelButtonColor: 'red',
        confirmButtonText: 'Yes, delete it!',
      }).then((result) => {
        if (result.value) {
          db
            .collection('tasks')
            .doc(this.task.id)
            .delete()
            .then(() => {
              Swal.fire(
                'Deleted!',
                'Your task has been deleted.',
                'success',
              );
            })
            .catch((error) => {
              console.error('Error removing document: ', error);
              Swal.fire(
                'Canceled!',
                'It comes from us :)',
                'error',
              );
            });
        } else {
          Swal.fire(
            'Canceled!',
            'Your task is safe.',
            'success',
          );
        }
      });
    },
  },
};
</script>
