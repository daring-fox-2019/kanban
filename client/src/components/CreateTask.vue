<template>
  <div id="shade">
      <form id="window" v-on:submit.prevent="save">
        <div class="form-group">
          <p style="font-size: 1.4rem;">Create New Task</p>
        </div>
        <div class="form-group">
          <label for="field1">Title</label>
          <input type="text" class="form-control" id="field1" placeholder="Enter title" v-model="title">
          <small id="emailHelp" class="form-text text-muted"></small>
        </div>
        <div class="form-group">
          <label for="field2">Description</label>
          <textarea class="form-control" id="field2" style="height: 5rem;"
            placeholder="Enter short description" v-model="description"></textarea>
        </div>
        <div class="form-group">
          <label for="field3">Assigned To</label>
          <input type="text" class="form-control" id="field3" placeholder="Enter person name" v-model="assignee">
        </div>
        <div id="alignright" style="margin-top: 2rem; margin-bottom: 0.5rem;">
          <a style="margin-right: 1.2rem; cursor: pointer;" class="btn btn-outline-secondary" v-on:click.prevent="$emit('close-form')">
            Cancel
          </a>
          <button type="submit" class="btn btn-primary">Save</button>
        </div>
      </form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: "",
      description: "",
      assignee: "",
      alert: "",
    }
  },
  methods: {
    save() {
      db.collection("tasks").add({
        title: this.title,
        description: this.description,
        assignee: this.assignee,
        createdAt: new Date(),
        group: 1,
      })
      .then(docRef => {
          console.log("Document written with ID: ", docRef.id);
          this.title = "";
          this.description = "";
          this.assignee = "";
          this.$emit('close-form');
      })
      .catch(error => {
          console.error("Error adding document: ", error);
      });
    },
  }
};
</script>

<style scoped>
* {
    text-align: left;
    font-size: 0.9rem;
}

#shade {
    position: fixed;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #26292ba6;
}

#window {
    background-color: white;
    width: 90%;
    max-width: 38rem;
    margin: 5rem auto;
    padding: 0.9rem 1.2rem;
    border-radius: 0.4rem;
}

#alignright {
  display: flex;
  justify-content: flex-end;
}

</style>
