<template>
  <div class="cardContent">
    <h2>{{item.title}}</h2>
    <div class="container-button">
      <div>
        <button class="btn btn-info" @click="removeItem">delete</button>
      </div>
      <br>  
      <div>
        <button class="btn btn-info" @click="actionOne">{{buttonOne}}</button>
        <!-- <h6 @click="actionOne">{{buttonOne}}</h6> -->
      </div>
      <br>
      <div>
        <button class="btn btn-info"  v-if="buttonTwo" @click="actionTwo">{{buttonTwo}}</button>
        <!-- <h6 @click="actionTwo" v-if="buttonTwo">{{buttonTwo}}</h6> -->
      </div>
    </div>
  </div>
</template>

<script>
import database from '../assets/config.js'
export default {
  name: 'ContentCard',
  data: function () {
    return {
      buttonOne: '',
      buttonTwo: ''
    }
  },
  props: ['item', 'name'],
  methods: {
    actionOne () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.buttonOne
      })
    },
    actionTwo () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.buttonTwo
      })
    },
    removeItem () {
      database.ref(`/${this.item.id}`).remove()
    }
  },
  created () {
    if (this.name === 'Pre-Log') {
      this.buttonOne = 'To-Do'
      this.buttonTwo = null
    } else if (this.name === 'To-Do') {
      this.buttonOne = 'Pre-Log'
      this.buttonTwo = 'On-Going'
    } else if (this.name === 'On-Going') {
      this.buttonOne = 'Finished'
      this.buttonTwo = 'To-Do'
    } else if (this.name === 'Finished') {
      this.buttonOne = 'On-Going'
      this.buttonTwo = null
    }
  }
}
</script>

<style scoped>
.cardContent {
  font-size: 7px;
  color: #fff;
  width: 70%;
  min-height: 100px;
  background-color: #f4d35e;
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
.card h6 {
  padding-top: 20px;
  font-size: 20px;
}
.container-button h4 {
  color: #1F271B;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
}
</style>