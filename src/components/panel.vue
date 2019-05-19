<template>
  <div>
    <b-card
      :header="panel.text"
      header-text-variant="white"
      header-tag="header"
      :header-bg-variant="panel.color"
      style="max-width: 20rem; border:none"
      no-body
    >
      <b-card-body :body-bg-variant="panel.color">
        <card class='cards' v-for="todo in todos" :todo="todo" :panel="panel" @detail='showModal' :key="todo.id" />
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import card from "@/components/card.vue";
import { db } from "@/main.js";
export default {
  name: "panel",
  props: ["panel"],
  data() {
    return {
      todos: [],
    };
  },
  components: {
    card
  },
  methods:{
    showModal(data){
      this.$emit('detail', data)
      console.log(data,'panel')
    }
  },
  created: function() {
    let status = this.panel.text.toLowerCase();
    db.collection("todo")
      .where("status", "==", status)
      .onSnapshot(querySnapshot => {
        this.todos = [];
        querySnapshot.forEach(doc => {
          let data= doc.data()
          let id = doc.id
          data.id = doc.id
          this.todos.push(data);
          this.todos.color = this.panel.color;
        });
      });
  }
};
</script>

<style>
.cards{
    position: relative;
      transition: top ease 0.5s;

}
.cards:hover{
   box-shadow: 2px 2px 10px rgba(109, 108, 108, 0.5);
   top:-4px
}
</style>