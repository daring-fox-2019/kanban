<template>
  <div>
    <nav class="mb-3">
      <h1 class="ml-3">Kanban</h1>
      <div>
        <b-button class="mr-3" variant="light" v-b-modal.modal-1>
          <i class="far fa-plus-square"></i> New Task
        </b-button>
      </div>
    </nav>

    <b-modal
      id="modal-1"
      centered
      title="Add New Task"
      ok-title="Add"
      ok-variant="danger"
      cancel-variant="outline-danger"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="col-12">
        <b-form>
          <b-form-group id="input-group-1" label="Title:" label-for="input-1">
            <b-form-input id="input-1" v-model="addForm.title" required></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" label="Description:" label-for="input-2">
            <b-form-input id="input-2" v-model="addForm.description" required></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-3" label="Point:" label-for="input-3">
            <b-form-input
              id="input-3"
              v-model="addForm.point"
              :state="validation"
              required
            ></b-form-input>
            <b-form-invalid-feedback :state="validation">Point must be a number</b-form-invalid-feedback>
          </b-form-group>
          <b-form-group id="input-group-4" label="Assigned To:" label-for="input-4">
            <b-form-input id="input-4" v-model="addForm.assignedTo" required></b-form-input>
          </b-form-group>
        </b-form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import db from "@/api/firebase.js";

export default {
  title: "Nav",
  data() {
    return {
      addForm: {
        title: "",
        description: "",
        point: "",
        assignedTo: ""
      }
    };
  },
  computed: {
    validation() {
      return Math.abs(Number(this.addForm.point)) >= 0 && this.addForm.point.length !== 0;
    }
  },
  methods: {
    handleOk() {
      const taskData = {
        title: this.addForm.title,
        description: this.addForm.description,
        point: Number(this.addForm.point),
        assignedTo: this.addForm.assignedTo,
        order: 0,
        createdAt: new Date()
      };

      console.log(taskData);
      db.collection("Tasks")
        .add(taskData)
        .then(docRef => {
          console.log(docRef);
          // console.log(docRef.id);
        })
        .catch(err => {
          console.log(err);
        });
      this.clearTaskData();
    },
    handleCancel() {
      this.clearTaskData();
    },

    clearTaskData() {
      this.addForm.title = "";
      this.addForm.description = "";
      this.addForm.point = "";
      this.addForm.assignedTo = "";
    }
  }
};
</script>

<style>
</style>
