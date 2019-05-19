<template>
  <div>
    <b-card header-tag="header" footer-tag="footer" style="color: black;">
      <h6 slot="header" class="mb-0">{{ detail.title }}</h6>
      <p>point : {{ detail.point }}</p>
      <p>Assigned To : {{ detail.assignedTo }}</p>
      <p>Description : {{ detail.description }}</p>
      <div>
        <b-button href variant="primary" @click="prev" size="sm" v-if="detail.status!='Pre-Log'">
          <i class="fas fa-arrow-alt-circle-left"></i>
        </b-button>
        <b-button href variant="danger" @click="remove" size="sm" id="remove">
          <i class="fas fa-trash"></i>
        </b-button>
        <b-button href variant="primary" @click="next" size="sm" v-if="detail.status!='Finished'">
          <i class="fas fa-arrow-alt-circle-right"></i>
        </b-button>
      </div>
    </b-card>
  </div>
</template>
<script>
import db from '@/api/api';
import swal from 'sweetalert';

export default {
  props: ['detail'],
  data() {
    return {};
  },
  methods: {
    remove() {
      swal({
        title: 'Are you sure to delete this task?',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          db.collection('task')
            .doc(this.detail.id)
            .delete()
            .then(() => {
              swal('Delete Task Success!', '', 'success');
            })
            .catch((error) => {
              console.error('Error removing document: ', error);
            });
        }
      });
    },
    prev() {
      let statusChange = null;
      if (this.detail.status === 'To-Do') {
        statusChange = 'Pre-Log';
      } else if (this.detail.status === 'On-Going') {
        statusChange = 'To-Do';
      } else if (this.detail.status === 'Finished') {
        statusChange = 'On-Going';
      }
      db.collection('task')
        .doc(this.detail.id)
        .set({ status: statusChange }, { merge: true })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
    next() {
      let statusChange = null;
      if (this.detail.status === 'Pre-Log') {
        statusChange = 'To-Do';
      } else if (this.detail.status === 'To-Do') {
        statusChange = 'On-Going';
      } else if (this.detail.status === 'On-Going') {
        statusChange = 'Finished';
      }
      db.collection('task')
        .doc(this.detail.id)
        .set({ status: statusChange }, { merge: true })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.card-body {
  padding: 10px;
}
.card {
  margin: 10px 0;
}
.btn-danger {
  margin: 0 5px;
}
</style>
