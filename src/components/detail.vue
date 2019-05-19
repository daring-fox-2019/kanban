<template>
  <b-modal id="detail" :title="todo.title">
    {{todo.description}}
    <div slot="modal-footer" class="w-100">
      <b-button
        variant="primary"
        size="sm"
        class="float-right mx-2"
        @click="$bvModal.hide('detail')"
      >done</b-button>
      <b-button variant="danger" size="sm" class="float-right ml-2" @click="deleteTodo">Delete</b-button>
    </div>
  </b-modal>
</template>

<script>
import { db } from "@/main.js";
export default {
  name: "DetailCard",
  props: ["todo"],
  methods: {
    deleteTodo() {
      let title = this.todo.title;
      let id = this.todo.id;
      db.collection("todo")
        .doc(this.todo.id)
        .delete()
        .then(() => {
          console.log(`successfuly deleted todo ${title} with id ${id}`);
          this.$bvModal.hide("detail");
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>