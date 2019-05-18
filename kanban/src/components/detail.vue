<template>
  <div>
    <b-button variant="outline-danger" @click="showdetil">Show detail</b-button>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import db from '@/api/firebase';
import swal from '@/helpers/swal';

export default {
  name: 'Showdetail',
  props: ['info'],
  data() {
    return {
      // info: info
    };
  },
  methods: {
    showdetil() {
      console.log(this.info);
      const a = '<button class="btn btn-dark" id="back">Back Log</button>';
      const A = '<button class="btn btn-dark" id="back" disabled>Back Log</button>';
      const b = '<button class="btn btn-dark" id="totodo">To Do</button>';
      const B = '<button class="btn btn-dark" id="totodo" disabled>To Do</button>';
      const c = '<button class="btn btn-dark" id="doing">Doing</button>';
      const C = '<button class="btn btn-dark" id="doing" disabled>Doing</button>';
      const d = '<button class="btn btn-dark" id="done">Done</button>';
      const D = '<button class="btn btn-dark" id="done" disabled>Done</button>';
      let z = '';
      switch (this.info.detil.data.status) {
        case 'Back Log':
          z = `${A}-------${b}-------${c}-------${d}`;
          break;
        case 'To Do':
          z = `${a}-------${B}-------${c}-------${d}`;
          break;
        case 'Doing':
          z = `${a}-------${b}-------${C}-------${d}`;
          break;
        case 'Done':
          z = `${a}-------${b}-------${c}-------${D}`;
          break;
      }

      Swal.fire({
        onBeforeOpen: () => {
          totodo.addEventListener('click', this.toTodo);
          back.addEventListener('click', this.back);
          doing.addEventListener('click', this.doing);
          done.addEventListener('click', this.done);
        },
        title: 'Task Detail',
        showCancelButton: true,
        showCloseButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete it!',
        html: `${`<br><br><label for "todoname">Task :</label>
             <input id="todoname" class="swal2-input" value='${this.info.detil.data.todoname}' disabled>`
            + `<label for "priority">Priority :</label>             
             <input id="priority" class="swal2-input" value='${this.info.detil.data.priority}' disabled>`
            + `<label for "assignedto">Assigned To :</label> 
             <input id="assignedto" class="swal2-input" value='${this.info.detil.data.assignedto}' disabled>`
            + `<label for "status">Status :</label> 
             <input id="status" class="swal2-input" value='${this.info.detil.data.status}' disabled>`
             + `<label for "description">Description :</label> 
             <input id="description" class="swal2-input" value='${this.info.detil.data.description}' disabled>`}${
          z}`,
      }).then((result) => {
        if (result.value) {
          swal.deletion()
            .then((result) => {
              if (result.value) {
                db.collection('tasks').doc(this.info.detil.id).delete()
                  .then(() => {
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success',
                    );
                  })
                  .catch((err) => {
                    console.log(err.message);
                  });
              }
            });
        }
      });
    },
    toTodo() {
      this.info.detil.status = 'To Do';
      swal.confirmation()
        .then((result) => {
          if (result.value) {
            return db.collection('tasks').doc(this.info.detil.id)
              .update({
                status: 'To Do',
              });
          }
        });
    },
    back() {
      this.info.detil.status = 'Back Log';
      swal.confirmation()
        .then((result) => {
          if (result.value) {
            Swal.fire(
              'Moved!',
              'Your file has been moved!',
              'success',
            );
            return db.collection('tasks').doc(this.info.detil.id)
              .update({
                status: 'Back Log',
              });
          }
        });
    },
    doing() {
      this.info.detil.status = 'Doing';
      swal.confirmation()
        .then((result) => {
          if (result.value) {
            Swal.fire(
              'Moved!',
              'Your file has been moved!',
              'success',
            );
            return db.collection('tasks').doc(this.info.detil.id)
              .update({
                status: 'Doing',
              });
          }
        });
    },
    done() {
      this.info.detil.status = 'Done';
      swal.confirmation()
        .then((result) => {
          if (result.value) {
            Swal.fire(
              'Moved!',
              'Your file has been moved!',
              'success',
            );
            return db.collection('tasks').doc(this.info.detil.id)
              .update({
                status: 'Done',
              });
          }
        });
    },
  },
};

</script>
