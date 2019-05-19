<template>
  <v-card px-2 mx-2 my-1 py-1>
    <v-card-title primary-title id="draggable" class>
      <v-layout justify-center column>
        <span
          :class="`${statusColor}--text headline font-weight-regular text-uppercase`"
        >{{ task.title }}</span>
        <hr :class="`${statusColor}`">
        <br>
        <span class="body-2 font-weight-light">
          Assigned to :
          <span class="body-2 font-weight-medium">{{ task.assigned }}</span>
        </span>
        <span class="body-2 font-weight-light">Point : {{ task.point }}</span>
        <span class="body-2 font-weight-light">Description : {{ task.detail }}</span>
      </v-layout>
    </v-card-title>

    <v-card-actions class="justify-space-between">
      <v-btn v-show="task.status > 1" flat color="blue" @click.prevent="prev(task.id, task.status)">
        <v-icon>arrow_back_ios</v-icon>
      </v-btn>
      <v-btn @click.prevent="del(task.id)" flat color="red">
        <v-icon>delete</v-icon>
      </v-btn>
      <v-btn
        v-show="task.status < 4"
        flat
        color="green"
        @click.prevent="next(task.id, task.status)"
      >
        <v-icon>arrow_forward_ios</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import alertify from 'alertifyjs';
import firebase from '../database/firebase';

const dbRef = firebase.collection('tasks');

export default {
  name: 'TaskCard',
  props: {
    task: {
      type: Object,
    },
  },
  methods: {
    del(id) {
      alertify.confirm(
        'Confirmation',
        'Are you sure you want to delete this task ?',
        () => {
          dbRef
            .doc(id)
            .delete()
            .then(() => {
              alertify.success('Task deleted');
            })
            .catch((error) => {
              alertify.error(error);
            });
        },
        () => {
          alertify.warning('Canceled');
        },
      );
    },

    prev(id, status) {
      dbRef.doc(id).update({ status: status - 1 });
    },

    next(id, status) {
      dbRef.doc(id).update({ status: status + 1 });
    },
  },
  computed: {
    statusColor() {
      if (this.task.status === 1) {
        return 'red';
      } if (this.task.status === 2) {
        return 'orange';
      } if (this.task.status === 3) {
        return 'blue';
      }
      return 'green';
    },
  },
};
</script>

<style>
.alertify .ajs-footer .ajs-buttons .ajs-button.ajs-ok {
  color: red;
}

.alertify .ajs-footer .ajs-buttons .ajs-button {
  color: black;
}
#draggable {
  cursor: grab;
}

#draggable:active {
  cursor: grabbing;
}
</style>
