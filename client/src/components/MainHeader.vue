<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-light bg-light"
      style="background-color: #bf2c3e !important"
    >
      <button
        type="button"
        class="btn btn-warning"
        data-toggle="modal"
        data-target="#exampleModal"
        data-whatever="@mdo"
      >
        <h6 style="margin: 0;">Create new todo</h6>
      </button>

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
              <h5 class="modal-title" id="exampleModalLabel">New Todo</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label class="col-form-label">Title:</label>
                  <input v-model="newTitle" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Description:</label>
                  <textarea v-model="newDescription" class="form-control"></textarea>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Assigned to:</label>
                  <input v-model="newAssignedTo" type="text" class="form-control" required>
                </div>
                <div class="form-group">
                  <label class="col-form-label">Status:</label>
                  <select v-model="newStatus" required>
                    <option>Pre-Log</option>
                    <option>To-Do</option>
                    <option>On-Going</option>
                    <option>Finished</option>
                  </select>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary"
                  data-dismiss="modal">Close</button>
                  <button
                    @click="create"
                    type="button"
                    class="btn btn-primary"
                    data-dismiss="modal"
                  >Create new todo</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import db from '@/api/api';

export default {
  data() {
    return {
      newTitle: '',
      newDescription: '',
      newStatus: '',
      newAssignedTo: '',
    };
  },
  methods: {
    create() {
      db.collection('todos')
        .add({
          title: this.newTitle,
          description: this.newDescription,
          status: this.newStatus,
          assignedTo: this.newAssignedTo,
        })
        .then((docRef) => {
          console.log('Document written with ID: ', docRef.id);
          this.newTitle = '';
          this.newDescription = '';
          this.newStatus = '';
          this.newAssignedTo = '';
        })
        .catch((error) => {
          console.error('Error adding document: ', error);
        });
    },
  },
};
</script>
