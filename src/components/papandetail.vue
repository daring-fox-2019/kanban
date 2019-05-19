<template>
  <div>
    <!-- <KanbanCard v-for="(data,index) in taskLists" :key="index" :data="data"></KanbanCard> -->
      <div class="my-4" v-for="(taskdetail, index) in todotaskdetail" :key="index">
        <div class="card text-center">
        <div class="card-header">
            {{ taskdetail.title }}
        </div>
        <div class="card-body">
            <h5 class="card-title">Point: {{ taskdetail.point }}
            </h5>
            <!-- Button trigger modal -->
            <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#modaldetail"
            @click.prevent="currentTask(taskdetail)">
            Show Detail
            </button>
        </div>
        <div class="card-footer text-muted">
            Assigned To: {{ taskdetail.assignedTo }}
        </div>
        <modal-show-detail
          @dariAppDone="done"
          @dariAppInProgress="inProgress"
          @dariAppTodo="todo"
          @dariAppBackLog="backLog"
          @dariAppDelete="deleteTask"
          :dataTask="dataTask"
          v-bind:modaltaskdetail="taskdetail"
        />
        </div>
      </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import db from '@/api/backend';
import ModalShowDetail from '@/components/ModalShowDetail.vue';

export default {
  name: 'papanTaskDetail',
  data() {
    return {
      selectedId: '',
      selectedTitle: '',
      selectedDescription: '',
      selectedPoint: '',
      selectedStatus: '',
    };
  },
  methods: {
    done(id) {
      this.$emit('dariAppDone', id);
    },
    inProgress(id) {
      this.$emit('dariAppInProgress', id);
    },
    backLog(id) {
      this.$emit('dariAppBackLog', id);
    },
    deleteTask(id) {
      this.$emit('dariAppDelete', id);
    },
    todo(id) {
      this.$emit('dariAppTodo', id);
    },
    currentTask(data) {
      this.$emit('dariPapanCurrentTask', data)
    },
  },
  props: ['todotaskdetail', 'dataTask'],
  components: {
    ModalShowDetail,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
