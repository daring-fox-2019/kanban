<template>
    <div>
        <div class="card" :class="cardclass" style="margin: 17px;">
            <div class="card-body">
                <div class="task-container">
                    <h5 class="card-title" >{{task.name}}</h5>

                    <div class="btn-container" v-if="status==='backlog'">
                        <button @click="clickButton(backlogButton.next)" class="btn btn-success">&gt;</button> 
                    </div>
                    <div class="btn-container" v-else-if="status==='progress'">
                        <button @click="clickButton(progressButton.previous)" class="btn btn-danger">&lt;</button>
                        <button @click="clickButton(progressButton.next)" class="btn btn-success">&gt;</button>
                    </div>
                    <div class="btn-container" v-else-if="status==='test'">
                        <button @click="clickButton(testButton.previous)" class="btn btn-danger">&lt;</button>
                        <button @click="clickButton(testButton.next)" class="btn btn-success">&gt;</button>
                    </div>
                    <div class="btn-container" v-else-if="status==='done'">
                        <button @click="clickButton(doneButton.previous)" class="btn btn-danger">&lt;</button>
                    </div>
                </div>
                <div class="card--footer">
                    <div
                        class="cursor-pointer delete"
                        style="color: #d20505; margin-left: 10px;" 
                        @click="deleteTask"
                    >    
                        <i class="far fa-trash-alt"></i> Delete
                    </div>
                </div>
            </div>
        </div>
        
        <Modal 
            :edit-task="editTask"
        />
    </div>
</template>

<script>
import database from '@/assets/config.js'
import Modal from '@/components/Modal'

export default {
    name: "ContentCard",
    components: {
        Modal
    },
    props: ['status', 'task', 'cardclass'],
    data() {
        return {
            selectedStatus: '',
            backlogButton: {
                next: 'progress'
            },
            progressButton: {
                previous: 'backlog',
                next: 'test'
            },
            testButton: {
                previous: 'progress',
                next: 'done'
            },
            doneButton:{
                previous: 'test',
            },
            taskEdit: ''
        }
    },
    methods: {
        goToProgress() {
            this.$emit('change-progress')
        },
        deleteTask() {
            database.ref(`/tasks/${this.task.id}`).remove()
        },
        getTask() {
            this.taskEdit=''
            database.ref(`/tasks/${this.task.id}`).once('value').then((snapshot) => {
                this.taskEdit= snapshot.val().name
            });
        },
        clickButton(status) {
            database.ref(`/tasks/${this.task.id}`).remove()      
            
            database.ref('/tasks').push({
                name: this.task.name,        
                status      
            })    
        }
    },
    mounted() {
    }
}
</script>

<style scoped>
    .cursor-pointer {
        cursor: pointer;
    }
    button {
        font-size: 12px
    }
    .card-title {
        max-width: 7em;
        overflow: hidden;
        text-overflow: ellipsis;
        overflow-wrap: initial;
    }
    .btn {
        padding: 2px 7px;
    }
    .btn-container {
        display: flex;
        flex-direction: column;
    }
    .task-container {
        display: flex;
        justify-content: space-between;
    }
    .card--yellow {
        background-color: #ffc;
    }
    .card--smoke {
        background-color: #f6f6f6;
    }
    .card--footer {
        display: flex;
        justify-content: flex-end;
    }
</style>

