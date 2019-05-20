<template>
<div class="card">
    <div class="card-header" :class="panel.color">
        {{panel.text}}
    </div>
    <div class="card-body">
        <!-- {{tasks}} -->
        <taskCard  :task="tasks" :status="panel.text"></taskCard>
        <!-- <h5 class="card-title">Special title treatment</h5>
        <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a> -->
    </div>
</div>
</template>

<script>
import {db} from '@/firebase/firebase.js'
import taskCard from '../components/taskCard'

export default {
    name : 'statusCard',
    data(){
        return{
            tasks : []
        }
    },
    props : ['panel'],
    components : {
        taskCard
    },
    created(){
        db.collection('tasks').where('status', '==', this.panel.text)
        .onSnapshot(snapshot=>{
        this.tasks = []
            snapshot.forEach(change =>{
                const entry = change.data()
                const {id} = change
                entry.id = id
                this.tasks.push(entry)
                })
        })
    }
}
</script>

<style>
    .card{
        width: 400px;
    }
    .red{
        text-align: left;
        background-color: red;
        font-size: 28px;
        color: white;
    }
    .green{
        text-align: left;
        background-color: green;
        font-size: 28px;
        color: white;
    }
    .orange{
        text-align: left;
        background-color: orange;
        font-size: 28px;
        color: white;
    }
    .blue{
        text-align: left;
        background-color: blue;
        font-size: 28px;
        color: white;
    }
</style>