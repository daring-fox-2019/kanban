<template>
  <div class="py-4 main-header">
    <h1 style="color:rgb(166,208,255)">
      <div class="py-3">
        <img src="https://i.ibb.co/9bfpDkN/b1.gif">
        <span style="margin-left:15px;">Princess' Diaries</span>
        <img src="https://i.ibb.co/hH0wK0x/b2.gif">
      </div>
    </h1>

    <h4 style="color:rgb(166,208,255);" class="m-0">Pin your task and princess will help you!</h4>
    <br>
    <input
      class="m-0"
      style="height:26px; font-family: 'Jua', sans-serif; !important"
      type="text"
      placeholder="Be productive!"
      v-model="taskName"
    >

    <div id="princess">
      <div
        style="display:inline-block"
        v-for="(prc, index) in princess"
        :key="index"
        class="my-3 options"
        id="chosenprincess"
      >
        <input v-on:change="getVal" type="radio" name="princesss" :value="prc">
        <img :src="prc" alt>
      </div>
    </div>

    <input
      style="background-color:rgb(166,208,255); border:none; margin-left:5px;"
      type="submit"
      value="Smooch!"
      @click="pushref"
    >
    <div class="dropdown-divider"></div>
  </div>
</template>

<script>
import database from "../assets/config.js";

export default {
  name: "MainHeader",
  data() {
    return {
      taskName: "",
      chosenPrincess: "",
      princess: [
        "https://i.ibb.co/4jX03XL/12.gif",
        "https://i.ibb.co/bs18Bsj/11.gif",
        "https://i.ibb.co/7nw0XWN/10.gif",
        "https://i.ibb.co/2dG0h5V/9.gif",
        "https://i.ibb.co/Lk7fFtg/8.gif",
        "https://i.ibb.co/0KBJxh1/7.gif",
        "https://i.ibb.co/R9ZztC7/6.gif",
        "https://i.ibb.co/kX0FV2d/5.gif",
        "https://i.ibb.co/M7qS0qn/4.gif",
        "https://i.ibb.co/gywbVgK/3.gif",
        "https://i.ibb.co/MNnN709/p1.gif"
      ]
    };
  },
  methods: {
    getVal() {

      this.chosenPrincess = event.target.value;
      
    },
    pushref() {
      database.ref("/").push({
        title: this.taskName,
        asignee: this.chosenPrincess,
        status: "Backlog"
      });
      this.taskName = "";
      this.asignee = "";
      this.chosenPrincess = this.chgNull();
    },
    chgNull() {
      this.chosenPrincess = null;
    }
  }
};
</script>

<style scoped>
</style>
