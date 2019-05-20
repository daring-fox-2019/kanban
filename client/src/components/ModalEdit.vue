<template>
    <b-modal id="modal-edit" title="Edit Task" centered ref="edit-modal">

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
          v-model="opt.task"
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
          v-model="opt.description"
          @keyup.enter="test"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Person in Charge:" label-for="input-3">
        <b-form-input
          type="text"
          id="input-3"
          required
          placeholder="Enter PIC"
          v-model="opt.pic"
          @keyup.enter="test"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Current status:" label-for="input-3">
        <b-form-select id="input-3" v-model="opt.status" :options="options"></b-form-select>
      </b-form-group>

        <div slot="modal-footer">
            <b-button class="my-2 my-sm-0" size="sm" @click="editData(opt.id)">Edit</b-button>
        </div>
    </b-modal>
</template>

<script>
import db from '@/api/firebase.js';

export default {
  props: ['opt'],
  name: 'ModalEdit',
  created() {
  },
  data() {
    return {
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
    editData(id) {
      // console.log(input)
      const update_obj = {
        task: this.opt.task,
        description: this.opt.description,
        status: this.opt.status,
        pic: this.opt.pic,
        updatedAt: new Date(),
      };

      db.collection('kanban')
        .doc(id)
        .update(update_obj)
        .then(() => {
          console.log('data updated');
          this.hideModal();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    hideModal() {
      // console.log(this);
      this.$refs['edit-modal'].hide();
    },
  },
};
</script>
<style scoped>
.modal-header {
    padding: 0.5rem;
}

footer.modal-footer {
    padding: 0.3rem;
}
</style>
