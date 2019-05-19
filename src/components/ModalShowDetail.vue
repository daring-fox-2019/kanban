<template>
     <!-- Modal -->
    <div
    class="modal fade"
    id="modaldetail"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5
                class="modal-title col-11"
                id="exampleModalLongTitle">Detail Task: {{ dataTask.title }}</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div align="left">
                <div class="container">
                <dl>
                        <dt>Task Description:</dt>
                        <dd>- {{ dataTask.description }}</dd>
                        <dt>Point:</dt>
                        <dd>- {{ dataTask.point }}</dd>
                        <dt>Status:</dt>
                        <dd>- {{ dataTask.status }}</dd>
                    </dl>
                </div>
            </div>
            <div class="modal-footer d-flex justify-content-between">
                <!-- BackLog -->
                <button
                    @click.prevent="deleteTask(dataTask.id)"
                    type="button"
                    data-dismiss="modal"
                    class="btn btn-secondary">Delete</button>
                <button
                    data-dismiss="modal"
                    class="btn btn-warning"
                    @click.prevent="todo(dataTask.id)"
                    v-show="dataTask.status==='BackLog'"
                    type="button"
                    >Todo</button>
                <!-- Todo -->
                <button
                    data-dismiss="modal"
                    class="btn btn-danger"
                    @click.prevent="backLog(dataTask.id)"
                    v-show="dataTask.status==='Todo'"
                    style="margin:5px"
                    variant="success">BackLog</button>
                <button
                    data-dismiss="modal"
                    class="btn btn-success"
                    @click.prevent="inProgress(dataTask.id)"
                    v-show="dataTask.status==='Todo'"
                    style="margin:5px"
                    variant="success">InProgress</button>
                <!-- InProgress -->
                <button
                    data-dismiss="modal"
                    class="btn btn-warning"
                    @click.prevent="todo(dataTask.id)"
                    v-show="dataTask.status==='InProgress'"
                    style="margin:5px"
                    variant="success">Todo</button>
                <button
                    data-dismiss="modal"
                    class="btn btn-info"
                    @click.prevent="done(dataTask.id)"
                    v-show="dataTask.status==='InProgress'"
                    style="margin:5px"
                    variant="success">Done</button>
                <!-- Done -->
                <button
                    data-dismiss="modal"
                    class="btn btn-success"
                    @click.prevent="inProgress(dataTask.id)"
                    v-show="dataTask.status==='Done'"
                    style="margin:5px" variant="success">InProgress</button>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'modaldetail',
  props: ['modaltaskdetail', 'dataTask'],
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
  },
};
</script>
