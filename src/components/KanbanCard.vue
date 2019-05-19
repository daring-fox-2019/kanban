<template>
    <div class="col-md-3">
        <div class="card">
            <h5 
                class="status-head"  
                :class="list[0].bgColor"
            >{{list[0].status}}</h5>
            <ContentCard
                v-for="(task, index) in list[0].tasks"
                :key="index"
                :task="task"
                :cardclass="list[0].cardClass"
                :status="list[0].status"
                @change-progress="changeProgress"
            ></ContentCard>
        </div>
    </div>
</template>

<script>
    import ContentCard from '@/components/ContentCard.vue';
    import database from '@/assets/config.js'

    const kanban_ref = database.ref('/tasks');

    export default {
        name: 'KanbanCard',
        props: ['list'],
        components: {
            ContentCard
        },
        methods: {
            changeProgress: () => {
                console.log('from kanbancard');
            },
        },
        mounted() {
        }
    }
</script>

<style scoped>
    .bgblue{ background-color: #4a90e2 }
    .bggold{ background-color: #f1ca57 }
    .bgred{ background-color: #ed534e }
    .bggreen{ background-color: #82aa47 }
    .status-head {
        color: #fff;
        padding: 13px;
        font-weight: 600;
    }
</style>

