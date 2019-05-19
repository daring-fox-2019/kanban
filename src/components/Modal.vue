<template>
    <div class="modal fade" id="modalKanban" tabindex="-1" role="dialog" aria-labelledby="exampleModalScrollableTitle" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable" role="document">
            <form @submit.prevent="editTask" style="width: 100%">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalScrollableTitle">Edit Task</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="input-group mb-3">
                            <input id="newTask" class="form-control" type="text" v-model="inputValue">

                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button">Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
        </form>
        </div>
    </div>
</template>

<script>
export default {
    props: ['taskEdit'],
    data() {
        return {
            inputValue:''
        }
    },
    methods: {
        editTask() {
            this.$emit('edit-task', this.inputValue)
        }
    }
}
</script>