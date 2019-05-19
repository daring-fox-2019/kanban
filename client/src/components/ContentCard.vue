<template>
  <div class="cardContent">
    <h2>{{item.title}}</h2>
    <small>{{item.description}}</small>
    <div class="container-button">
      <div>
        <h4 @click="remove">delete</h4>
      </div>

      <div>
        <h4 @click="firstAction()" v-if="firstButton !== null">{{firstButton}}</h4>
      </div>

      <div>
        <h4 @click="nextAction" v-if="nextButton !== null ">{{nextButton}}</h4>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../assets/config.js";

export default {
  name: "ContentCard",
  data() {
    return {
      firstButton: "",
      nextButton: ""
    };
  },
  props: ["item"],
  methods: {
    nextAction() {
      let changeStatus = this.nextButton;
      database
        .collection("kanbanLists")
        .doc(this.item.id)
        .update({
          status: changeStatus
        });
    },
    firstAction() {
      let changeStatus = this.firstButton;
      database
        .collection("kanbanLists")
        .doc(this.item.id)
        .update({
          status: changeStatus
        });
    },
    remove() {
      database
        .collection("kanbanLists")
        .doc(this.item.id)
        .delete()
        .then(() => {
          console.log("Document has been deleted");
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (this.item.status === "prelog") {
      this.firstButton = "ToDo";
      this.nextButton = null;
    } else if (this.item.status === "ToDo") {
      this.firstButton = "prelog";
      this.nextButton = "OnGoing";
    } else if (this.item.status === "OnGoing") {
      this.firstButton = "Finished";
      this.nextButton = "ToDo";
    } else if (this.item.status === "Finished") {
      this.firstButton = "OnGoing";
      this.nextButton = null;
    }
  }
};
</script>

<style scoped>
.cardContent {
  font-size: 10px;
  color: #fff;
  width: 70%;
  min-height: 100px;
  background-color: #4684f6;
  -webkit-box-shadow: 0px 5px 4px #c0c0c09d;
  -moz-box-shadow: 0px 5px 4px #c0c0c09d;
  box-shadow: 0px 5px 4px #c0c0c09d;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 50px;
  vertical-align: middle;
  cursor: pointer;
  padding-bottom: 20px;
}
.card h2 {
  padding-top: 20px;
  font-size: 20px;
}
.container-button h4 {
  color: #4684f6;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
}
</style>