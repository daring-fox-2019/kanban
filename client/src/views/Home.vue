<template>
  <div class="home">
    <MainHeader></MainHeader>
    <div class="container">
      <div class="container-card">
        <h1>Prelog</h1>
        <KanbanCard :data = "prelog"> </KanbanCard>
         <h1>ToDo</h1>
        <KanbanCard :data = "ToDo"></KanbanCard>
         <h1>OnGoing</h1>
        <KanbanCard :data = "OnGoing"></KanbanCard>
         <h1>Finished</h1>
        <KanbanCard  :data = "Finished"></KanbanCard>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MainHeader from "@/components/MainHeader";
import KanbanCard from "@/components/KanbanCard";

import { database } from "../assets/config.js";
// import database from '../assets/config.js'

export default {
  name: "home",
  components: {
    MainHeader,
    KanbanCard
  },
  data() {
    return {
      prelog : [],
      ToDo : [],
      OnGoing : [],
      Finished : [],
    };
  },
  created() {
    var leadsRef = database.collection("kanbanLists");

    leadsRef.onSnapshot((snapshot) => {
      this.prelog = [];
      this.ToDo = [];
      this.OnGoing = [];
      this.Finished = [];
      snapshot.forEach(task => {
        console.log(task.data(),'ini task');
        
         this[`${task.data().status}`].push({
           id : task.id,
           ...task.data()
         })
      });
    });
  },
  mounted() {}
};
</script>
<style>
.container-card {
  margin-top: 30px;
  padding-top: 5%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 90%;
  grid-gap: 20px;
}
.container {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 675px;
}
@media only screen and (max-width: 800px) {
  .container-card {
    display: block;
  }
}
</style>