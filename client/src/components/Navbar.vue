<template>
  <div class="row">
    <h1>Kanban Board</h1>
    <button
      @click="setDueDate"
      type="button"
      class="btn btn-primary ml-auto"
      data-toggle="modal"
      data-target="#exampleModal"
      ref="modalButton"
    >Add Task</button>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Task Form</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title-name" class="col-form-label">Title :</label>
              <input v-model="form.title" type="text" class="form-control" id="title-name">
            </div>
            <div class="form-group">
              <label for="assignee-name" class="col-form-label">Assignee :</label>
              <input v-model="form.assignee" type="text" class="form-control" id="assignee-name">
            </div>
            <div class="form-group">
              <label for="description-text" class="col-form-label">Description :</label>
              <textarea
                v-model="form.description"
                class="form-control"
                id="description-text"
                rows="5"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="meeting-time">Due Date :</label>
              <input
                v-model="form.due"
                type="datetime-local"
                id="meeting-time"
                name="meeting-time"
                :min="minstr"
                :max="maxstr"
              >
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            <button
              @click="addTask"
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
            >Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import db from '@/firebase/db.js';
import EventBus from '@/EventBus';

export default {
  data() {
    return {
      category: '',
      form: {
        id: '',
        title: '',
        assignee: '',
        description: '',
        due: '',
        dueShow: '',
      },
      min: '',
      max: '',
      minstr: '',
      maxstr: '',
    };
  },
  mounted() {
    EventBus.$on('editing', (category, task) => {
      this.category = category;
      this.form = { ...task };
      this.$refs.modalButton.click();
    });
  },
  methods: {
    emptyForm() {
      (this.category = ''),
      (this.form = {
        id: '',
        title: '',
        assignee: '',
        description: '',
        due: '',
      });
    },
    setDueDate() {
      console.log(this.form.due);
      if (!this.form.due) {
        console.log('if');
        this.form.due = new Date();
        this.form.due.setDate(this.form.due.getDate() + 1);
      } else {
        console.log('else');
        this.form.due = this.form.due.toDate();
      }
      console.log(this.form.due);
      this.form.due.setHours(this.form.due.getHours() + 7);
      this.min = new Date();
      this.max = new Date();
      this.max.setFullYear(this.max.getFullYear() + 1);
      this.form.due = this.form.due.toISOString().slice(0, 16);
      this.minstr = this.min.toISOString().slice(0, 16);
      this.maxstr = this.max.toISOString().slice(0, 16);
      console.log(this.form.due);
    },
    addTask() {
      if (
        this.form.title === ''
        || this.form.assignee === ''
        || this.form.description === ''
      ) {
        Swal.fire({
          type: 'error',
          title: 'Empty field',
          text: 'Please fill all the field!',
          onClose: () => {
            this.$refs.modalButton.click();
          },
        });
      } else if (new Date(this.form.due) < this.min) {
        Swal.fire({
          type: 'error',
          title: 'Incorrect Date!!!',
          text: 'Date cannot be the past!',
          onClose: () => {
            this.$refs.modalButton.click();
          },
        });
      } else {
        const due = new Date(this.form.due);
        console.log(this.form.due, due);
        if (!this.category) {
          db.collection('Back-Log')
            .add({
              title: this.form.title,
              assignee: this.form.assignee,
              description: this.form.description,
              due,
            })
            .then((docRef) => {
              console.log('Document written with ID: ', docRef.id);
              this.emptyForm();
            })
            .catch((error) => {
              console.error('Error adding document: ', error);
            });
        } else {
          db.collection(this.category)
            .doc(this.form.id)
            .set({
              title: this.form.title,
              assignee: this.form.assignee,
              description: this.form.description,
              due,
            })
            .then(() => {
              console.log('Document successfully written!');
              this.emptyForm();
            })
            .catch((error) => {
              console.error('Error writing document: ', error);
            });
        }
      }
    },
  },
};
</script>
