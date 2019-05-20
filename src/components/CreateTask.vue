<template>
  <form @submit.prevent="handleSubmit">
    <div class="modal-card" style="width: auto">
      <section class="modal-card-body pl32 pr32 pt32 pb32">
        <b-field label="Title">
          <b-input
            type="text"
            v-model="task.title"
            placeholder="Some task description"
            required>
          </b-input>
        </b-field>

        <b-field label="Assigned to">
          <b-input
            type="text"
            v-model="task.assigned_to"
            placeholder="Who can do it"
            required>
          </b-input>
        </b-field>

        <div class="buttons mt32">
          <b-button
            type="is-text"
            @click="assignRandom"
          >random
          </b-button>
          <b-button
            native-type="submit"
            type="is-primary"
          >Save
          </b-button>
          <b-button @click="$parent.close()">Close</b-button>
        </div>
      </section>
    </div>
  </form>
</template>

<script>
import faker from 'faker'

import Toast from './Toast'
import db from '../api/firestore'

export default {
  data: function () {
    return {
      task: {
        title: '',
        assigned_to: ''
      }
    }
  },
  methods: {
    handleSubmit: function () {
      db
        .collection('tasks')
        .add({
          title: this.task.title,
          assigned_to: this.task.assigned_to,
          status: 'backlog',
          created_at: new Date,
          updated_at: new Date
        })
        .then(doc => {
          this.$parent.close()
          Toast.fire({
            type: 'success',
            title: 'Successfully adding new Task.'
          })
        })
    },
    assignRandom: function () {
      this.task = {
        title: faker.lorem.sentence(),
        assigned_to: faker.name.firstName()
      }
    }
  }
}
</script>

<style>

</style>
