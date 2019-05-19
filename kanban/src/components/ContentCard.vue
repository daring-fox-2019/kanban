<template>
  <div class="cardContent">
    <h3 style="margin-top:10px; font-family: 'Jua', sans-serif; !important" >{{item.title}}</h3>
    <h4 class="my-3" style="display:inline-block; margin-bottom:10px; font-family : Satisfy', cursive !important" >For : </h4><img style="display:inline-block;" :src="item.asignee">

    <!-- <div class="container-button"> -->
      <div>
        <button style="  background-color: rgb(179,231,255);" @click="removeItem" type="button" class="btn btn-sm">Delete</button>
      </div>

      <div>
        <button @click="changeCurrent" type="button" class="btn btn-sm btn-light">{{currentState}}</button>
      </div>

      <div>
        <button @click="changeToNext" v-if="nextState" type="button" class="btn btn-sm btn-light">{{nextState}}</button>

      </div>
    </div>
  <!-- </div> -->
</template>

<script>
import database from '../assets/config.js'

export default {
  name: 'ContentCard',
  props: ['item', 'name'],
  data: function () {
    return {
      currentState: '',
      nextState: ''
    }
  },
  created () {
    if (this.name === 'Backlog') {
      this.currentState = 'To-Do'
      this.nextState = null
    } else if (this.name === 'To-Do') {
      this.currentState = 'Backlog'
      this.nextState = 'On-Going'
    } else if (this.name === 'On-Going') {
      this.currentState = 'Finished'
      this.nextState = 'To-Do'
    } else if (this.name === 'Finished') {
      this.currentState = 'On-Going'
      this.nextState = null
    }
  },
  methods: {
    changeCurrent () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        asignee : this.item.asignee,
        status: this.currentState
      })
    },
    changeToNext () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
       asignee : this.item.asignee,
        status: this.nextState
      })
    },
    removeItem () {
      database.ref(`/${this.item.id}`).remove()
    }
  }
}
</script>

<style scoped>
.cardContent {
  font-size: 10px;
  color: rgb(18, 25, 44);
  width: 80%;
  min-height: 100px;
  background-color:transparent;
  border-radius: 5px;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  margin-bottom: 10px;
  vertical-align: middle;
  cursor: pointer;
  padding-bottom: 20px;
  opacity: 0.9;
}
button {
  width: 90px;
  align-content: center;
}
button, input, optgroup, select, textarea {
  margin :3px;
}

</style>
