<template>
  <div class="home">
    <div class="main-header">
        <input 
            type="text" 
            placeholder="what's your plan?" 
            v-model="taskName"
        >
        <button 
            type="submit" 
            @click="createTask" 
            class="btn btn-success"
        >Create</button>
    </div>
    <div class="container">
        <div class="row">
            <KanbanCard
                v-for="(list, index) in taskList"
                :key="index"
                :list="list"
            ></KanbanCard>
        </div>
    </div>
  </div>
</template>

<script>
import KanbanCard from '@/components/KanbanCard.vue'
import database from '@/assets/config.js'

const kanban_ref = database.ref('/tasks');

export default {
    name: "home",
    components: {
        KanbanCard
    },
    data() {
        return {
            taskList:[],
            taskName: '',
            backlog: [
                {
                    status:'backlog',
                    bgColor: 'bgblue',
                    cardClass: 'card--yellow',
                    tasks:[]
                }
            ],
            progress: [
                {
                    status:'progress',
                    bgColor: 'bggold',
                    cardClass: 'card--smoke',
                    tasks:[]
                }
            ],
            test: [
                {
                    status:'test',
                    bgColor: 'bgred',
                    cardClass: 'card--yellow',
                    tasks:[]
                }
            ],
            done: [
                {
                    status:'done',
                    bgColor: 'bggreen',
                    cardClass: 'card--smoke',
                    tasks:[]
                }
            ]
        }
    },
    methods: {
        createTask() {
            kanban_ref.push({
                name: this.taskName,
                status: 'backlog',
                created_at: new Date()
            })
            this.taskName=''
        },
        fetchingTasks() {        
            kanban_ref.on('value', (snapshot) => {
                this.backlog[0].tasks=[]
                this.progress[0].tasks=[]
                this.test[0].tasks=[]
                this.done[0].tasks=[]
                var key = Object.keys(snapshot.val());
                snapshot.forEach((childSnapshot) => {
                    let data = childSnapshot.val()
                    if(data.status==='backlog') {
                        data.id = childSnapshot.key
                        this.backlog[0].tasks.push(data)
                    }else if(data.status==='progress') {
                        data.id = childSnapshot.key
                        this.progress[0].tasks.push(data)
                    }else if(data.status==='test') {
                        data.id = childSnapshot.key
                        this.test[0].tasks.push(data)
                    }else if(data.status === 'done') {
                        data.id = childSnapshot.key
                        this.done[0].tasks.push(data)
                    }
                })
            })

            this.taskList=[]
            this.taskList.push(this.backlog)
            this.taskList.push(this.progress)
            this.taskList.push(this.test)
            this.taskList.push(this.done)
        }
    },
    mounted() {
        this.fetchingTasks()
    }
}
</script>

<style scoped>
.main-header { margin: 40px 0px; }
</style>
