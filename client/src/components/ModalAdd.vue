<template>
  <div>
    <!-- Modal Component -->
    <b-modal id="modal-add" title="New Task Form" centered ref="modal-add">
      <b-form-group
        id="input-group-1"
        label="Task title:"
        label-for="input-1"

        description="*Required"
      >
        <b-form-input
          id="input-1"
          type="text"
          required
          v-model="data.task"
          placeholder="Enter task title"
          @keyup.enter="test"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Description:" label-for="input-2">
        <b-form-input
          type="text"
          id="input-2"
          required
          placeholder="Enter description"
          v-model="data.description"
          @keyup.enter="test"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Person in Charge:" label-for="input-3">
        <b-form-input
          type="text"
          id="input-3"
          required
          placeholder="Enter PIC"
          v-model="data.pic"
          @keyup.enter="test"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Current status:" label-for="input-3">
        <b-form-select id="input-3" v-model="data.status" :options="options"></b-form-select>
      </b-form-group>

      <div slot="modal-footer">
            <b-button class="my-2 my-sm-0" size="sm" @click="submitTaskData">Submit</b-button>
        </div>
    </b-modal>
  </div>
</template>

<script>
import db from '@/api/firebase.js';

export default {
  name: 'ModalAdd',
  data() {
    return {
      data: {
        task: '',
        description: '',
        pic: '',
        status: null,
      },
      show: {
        onAdd: false,
      },
      options: [
        // { value: null, text: "Please select an option" },
        // { value: "a", text: "This is First option" },
        // { value: "b", text: "Selected Option" },
        // { value: { C: "3PO" }, text: "This is an option with object value" },
        // { value: "d", text: "This one is disabled", disabled: true }
        { value: 0, text: 'Backlog' },
        { value: 1, text: 'Start' },
        { value: 2, text: 'On progress' },
        { value: 3, text: 'Delivered' },
      ],
    };
  },
  methods: {
    submitTaskData() {
      const obj_submit = {
        task: this.data.task,
        description: this.data.description,
        pic: this.data.pic,
        status: this.data.status,
        createdAt: new Date(),
      };

      db.collection('kanban')
        .add(obj_submit)
        .then((docRef) => {
          console.log(docRef);
          this.hideModal();
          this.$swal({
            // position: 'top-end',
            type: 'success',
            title: 'Added to board',
            showConfirmButton: false,
            timer: 1500
          })
        })
        .catch((err) => {
          console.log(err);
        });
      this.hideModal();
    },
    hideModal() {
      console.log(this);
      this.$refs['modal-add'].hide();
    },
  },
};
</script>
