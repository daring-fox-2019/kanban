<template>
  <div class="home">
    <section class="snow-bg">
      <MainHeader></MainHeader>
      </section>
    <div class="container">
      <div class="row">
      <div v-for="(data,index) in taskLists" :key="index"  class="col-sm">
        <KanbanCard :data="data"></KanbanCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainHeader from "@/components/MainHeader.vue";
import KanbanCard from "@/components/KanbanCard.vue";
import database from "../assets/config.js";

const tasks = [
  {
    name: "Backlog",
    data: []
  },
  {
    name: "To-Do",
    data: []
  },
  {
    name: "On-Going",
    data: []
  },
  {
    name: "Finished",
    data: []
  }
];


var kanbanRef = database.ref("/");
kanbanRef.on("value", function(snapshot) {
  tasks[0].data = [];
  tasks[1].data = [];
  tasks[2].data = [];
  tasks[3].data = [];
    snapshot.forEach(function(childSnapshot) {
      console.log(childSnapshot.val(), 'kyk apa???')
      let obj = childSnapshot.val();
      obj.id = childSnapshot.key;
      
      if (childSnapshot.val().status == "Backlog") {
        tasks[0].data.push(obj);
      } else if (childSnapshot.val().status == "To-Do") {
        tasks[1].data.push(obj);
      } else if (childSnapshot.val().status == "On-Going") {
        tasks[2].data.push(obj);
      } else {
        tasks[3].data.push(obj);
      }
    });
});

export default {
  name: "home",
  components: {
    MainHeader,
    KanbanCard
  },
  data: function() {
    return {
      taskLists: tasks
    };
  },
};
</script>

<style>

* {
  margin: 0;
  padding: 0;
}

a {
	color: white;
	font-style: italic;
}

/*Keyframes*/
@keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}

@-moz-keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}

@-webkit-keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
 50% {background-color:#b4cfe0;}
 100% {background-position: 500px 1000px, 400px 400px, 300px 300px; background-color:#b4cfe0;}
}

@-ms-keyframes snow {
0% {background-position: 0px 0px, 0px 0px, 0px 0px;}
 100% {background-position: 500px 1000px, 400px 400px, 300px 300px;}
}


body {
	background-color: #e2eff8; 
	background-image: url('https://lh3.googleusercontent.com/-zt9UOQSBaIo/Tz9P04-UuqI/AAAAAAAAACg/hTwHLFKo9t8/s400/snow.png'),
 url('https://lh4.googleusercontent.com/-0fKGNnbIGPQ/Tz9P0zZ9F2I/AAAAAAAAACk/Slj2F3A_8v8/s800/snow2.png'),
 url('https://lh5.googleusercontent.com/-kGPWUnNvnxw/Tz9P090iTfI/AAAAAAAAACo/UhDKoIDu4Ms/s144/snow3.png');
	
	-webkit-animation: snow 20s linear infinite;
	-moz-animation: snow 20s linear infinite;
	-ms-animation: snow 20s linear infinite;
	animation: snow 20s linear infinite;
}

#container {
	width: 800px;
	margin: 200px auto;
	
	text-align: center;
	color: white;
	font: 100px/1 'Spirax', cursive;
	
	text-shadow: 0px 0px 4px rgba(255,255,255, 0.5);
}

#container p {
	font: 12px/1.5 "Helvetica Neue", Arial, Helvetica, Geneva, sans-serif;
}

</style>
