<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-info fixed-top">
      <a class="navbar-brand position text-light" href="#">KANBAND?</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav"></ul>
      </div>
      <div class="collapse navbar-collapse d-flex flex-row-reverse">
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          data-target="#myModal"
        >add new</button>
      </div>
    </nav>
    <div class="modal fade" id="myModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <!-- Modal Header -->
          <div class="modal-header">
            <h4 class="modal-title">Add New</h4>
            <button type="button" class="close" data-dismiss="modal">&times;</button>
          </div>

          <!-- Modal body -->
          <div class="modal-body">
            <div class="form-group">
              <label for="usr">Title:</label>
              <input type="text" class="form-control" id="title" name="title" v-model="taskName">
            </div>
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea class="form-control" rows="5" id="description" v-model="description"></textarea>
            </div>
          </div>

          <!-- Modal footer -->
          <div class="modal-footer">
            <button type="button" class="btn btn-info" @click="sendItem">Add New</button>
            <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from '@/api/config.js'

export default {
  name: 'navbar',
  data () {
    return {
      taskName: '',
      description: ''
    }
  },
  methods: {
    sendItem () {
      database.ref('/').push({
        title: this.taskName,
        descrip: this.description,
        status: 'BackLog'
      })
      this.taskName = ''
      this.description = ''
      $('#myModal').modal('toggle')
    }
  }
}
</script>

<style scoped>
</style>
