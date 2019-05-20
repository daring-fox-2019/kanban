<template>
  <b-modal
      id="modal-prevent-closing"
      size="lg"
      ref="modal"
      title="New Task"
    >
      <form >
        <b-form-group
          class="form-modal"
          label-for="name-input"
          invalid-feedback="Name is required"
        >
          <label>Title</label>
          <b-form-input
            id="name-input"
            label="name"
            v-model="formData.Title"
            placeholder="Title"
            required
          ></b-form-input>
            <br>
            <label>Description</label>
            <b-form-textarea
            id="description-input"
            v-model="formData.Description"
            placeholder="Description"
            required
          ></b-form-textarea>
            <br>
            <label>Point</label>
            <b-form-input
            id="point-input"
            v-model="formData.Point"
            placeholder="0"
            required
          ></b-form-input>
            <br>
            <label>Assigned to</label>
            <b-form-input
            id="assignee-input"
            v-model="formData.Assigned"
            placeholder="Assigned to"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <div slot="modal-footer" class="w-100">
          <p class="float-left">Modal Footer Content</p>
          <b-button
            variant="primary"
            size="sm"
            type="submit"
            class="float-right"
            @click="addTodo"
          >
          Add Task
          </b-button>
          <b-button
            variant="primary"
            size="sm"
            class="float-right mr-4"
            @click.prevent="$bvModal.hide('modal-prevent-closing')"
          >
            Cancel
          </b-button>
      </div>
    </b-modal>
</template>

<script>
import swal from 'vue-sweetalert2'
import {db} from '@/firebase/firebase.js'

export default {
  name : 'addTask',
  data(){
    return{
      formData : {
        Title : '',
        Description : '',
        Point: 0 ,
        Assigned : ''
      }
    }
  },
  methods : {
    addTodo(){
      db.collection('tasks')
      .add({
          title: this.formData.Title,
          description: this.formData.Description,
          point: this.formData.Point,
          assigned: this.formData.Assigned,
          status: 'Back-Log',
          createdAt: new Date(),
        })
        .then(docref => {
          this.formData.Title = '';
          this.formData.Description = '';
          this.formData.Point = 0;
          this.formData.Assigned = '';
          this.$swal('Success!', 'Task added', 'success')
          this.$refs['modal'].hide()
        })
        .catch((error) => {
          console.log('error');
          console.log(error);
        });
    }
  }
}
</script>

