<template>
    <v-hover>
    <v-card class='taskCard' slot-scope="{ hover }"
      :class="`elevation-${hover ? 6 : 2}`">
        <v-layout class="title" pa-2>
            {{task.title}}
        </v-layout>
        <v-layout pa-3 column>
            <span>Point: {{task.point}}</span>
            <span>Assigned to: {{task.assigned_to}}</span>
        </v-layout>
        <v-card-actions>
            <v-btn flat @click="dialog = true">Show Details</v-btn>
        </v-card-actions>
        <div class="text-xs-center">
            <v-dialog ref="detailDialog" v-model="dialog" width="500">
            <v-card>
                    <v-layout class='title' pa-3>
                        {{task.title}}
                        <v-spacer></v-spacer>
                        <v-icon @click="dialog = false">
                            close
                        </v-icon>
                    </v-layout>
                <v-divider></v-divider>
                <v-layout column pa-3>
                    <div class='detail'>
                        <strong>Point:<br></strong>
                        {{task.point}}
                    </div>
                    <div class='detail'>
                        <strong>Description:<br></strong>
                        {{task.description}}
                    </div>
                    <div class='detail'>
                        <strong>Status:<br></strong>
                        {{task.status}}
                    </div>
                </v-layout>
                <v-card-actions>
                    <v-layout justify-space-around>
                        <v-btn
                            flat
                            dark
                            class="amber darken-3"
                            @click="updateTask({task, newStatus: prevText})"
                            v-if="task.status !== 'backlog'"
                        >
                        {{prevText}}
                        </v-btn>
                        <v-btn
                            flat
                            dark
                            class="red darken-1"
                            @click="deleteTask(task)"
                        >
                        Delete
                        </v-btn>
                        <v-btn
                            flat
                            class='green accent-4'
                            dark
                            @click="updateTask({task: task, newStatus: nextText})"
                            v-if="task.status !== 'done'"
                        >
                        {{nextText}}
                        </v-btn>
                    </v-layout>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
    </v-card>
  </v-hover>
</template>

<script>
import db from '../api/apiFireStore.js'
export default {
    name: 'Task',
    props: ['task'],
    data() {
        return {
            dialog: false,
        }
    },
    computed: {
        prevText() {
            let text = ''
            switch(this.task.status.toLowerCase()) {
                case 'todo':
                    text = 'backlog';
                    break;
                case 'doing':
                    text = 'todo'
                    break;
                case 'done':
                    text = 'doing'
                    break;
                case 'backlog':
                default:
                    text = ''
                    break;
            }

            return text;
        },
        nextText() {
            let text =''
            switch(this.task.status.toLowerCase()) {
                case 'backlog':
                    text= 'todo'
                    break;
                case 'todo':
                    text = 'doing';
                    break;
                case 'doing':
                    text = 'done'
                    break;
                case 'done':
                default:
                    text = '';
                    break;
            }
            return text;
        }
    },
    methods: {
        updateTask({task, newStatus}) {
            console.log(task, newStatus);
            newStatus = newStatus.toLowerCase()
            this.dialog = false
            let docRef = db.collection("tasks").doc(task.id)
            return docRef.update({
                status: newStatus
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.log(this.$refs);
                console.error(error);
            });
        },
        deleteTask(task) {
            this.dialog = false;
            db.collection("tasks").doc(task.id)
            .delete()
            .then(() => {
            }).catch(function(error) {
                console.error("Error removing document: "+task.id, error);
            });
        }
    }
}
</script>

<style scoped>

.title {
    font-size: 10px;
    background: #455A64;
    color: white;
    border-bottom: 1px solid rgb(235, 235, 235);
}
.taskCard {
    margin-bottom: 10px;
}

.detail {
    height: 40px;
    margin-bottom: 10px;
}

</style>
