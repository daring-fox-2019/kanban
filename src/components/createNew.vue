<template>
  <div>
    <b-modal id="modalCreateNew" title="BootstrapVue">
      <form class="row pr-4">
        <label class="col-4">Title</label>
        <input type="text" class="col-8" v-model="title">
        <label class="col-4">Description</label>
        <input type="text" class="col-8" v-model="description">
        <label class="col-4">PIC</label>
        <input type="text" class="col-8" v-model="pic">
        <label class="col-4">Status</label>
        <select class="col-8" v-model="status">
          <option value="back-log">Back-log</option>
          <option value="todo">To-do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </form>
      <div slot="modal-footer" class="w-100">
        <b-button variant="success" size="sm" class="float-right ml-2" @click="createNew">Create</b-button>
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="$bvModal.hide('modalCreateNew')"
        >Cancel</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import {db} from '@/main.js'
export default {
  name: "CreateNew",
  data() {
    return {
      title: "",
      description: "",
      status: "",
      pic:""
    };
  },
  methods: {
    createNew() {
      let newTodo = db.collection("todo").doc()
      console.log(newTodo)
      newTodo
        .set({
          title: this.title,
          description: this.description,
          status: this.status,
          pic: this.pic
        })
        .then(() =>{
          this.title='';
          this.description = "";
          this.status = "";
          this.pic = "";
          console.log("Document successfully written!");
          this.$bvModal.hide('modalCreateNew')
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
    }
  }
};
</script>