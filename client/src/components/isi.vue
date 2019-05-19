<template>

<div class="card text-white mb-3" :style="template">
  <div class="card-header"><h4>{{item.title}}</h4></div>
  <div class="card-body">
    <p class="card-text">{{item.descrip}}</p>
    <div class="d-flex flex-column align-self-end">
      <div>
       <button class="btn" :style="designOne"  @click="actionOne">{{buttonOne}}</button>
    </div>
    <div>
      <button class="btn" :style="designTwo" @click="actionTwo" v-if="buttonTwo">{{buttonTwo}}</button>
    </div>
     <div>
      <button class="btn btn-danger"  @click="removeItem">delete</button>
    </div>
    </div>

  </div>
</div>
</template>

<script>
import database from '@/api/config.js'

export default {
  name: 'isi',
  data: function () {
    return {
      buttonOne: '',
      buttonTwo: '',
      designOne: '',
      template: ''
    }
  },
  props: ['item', 'name'],
  methods: {
    actionOne () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.buttonOne,
        descrip: this.item.descrip
      })
    },
    actionTwo () {
      database.ref(`/${this.item.id}`).remove()
      database.ref('/').push({
        title: this.item.title,
        status: this.buttonTwo,
        descrip: this.item.descrip
      })
    },
    removeItem () {
      database.ref(`/${this.item.id}`).remove()
    }
  },
  created () {
    if (this.name === 'BackLog') {
      this.buttonOne = 'ToDo'
      this.buttonTwo = null
      this.designOne = `background:#4564B0; color:white;`
      this.template = `max-width: 18rem;background:#292F6C; `
    } else if (this.name === 'ToDo') {
      this.buttonOne = 'BackLog'
      this.buttonTwo = 'OnGoing'
      this.designOne = `background:#292F6C; color:white;`
      this.designTwo = `background:#56A7AF; color:white;`
      this.template = `max-width: 18rem; background:#4564B0; `
    } else if (this.name === 'OnGoing') {
      this.buttonTwo = 'Finished'
      this.buttonOne = 'ToDo'
      this.designTwo = `background:#6AC19E; color:white;`
      this.designOne = `background:#4564B0; color:white;`
      this.template = `max-width: 18rem; background:#56A7AF; `
    } else if (this.name === 'Finished') {
      this.buttonOne = 'OnGoing'
      this.designOne = `background:#56A7AF; color:white;`
      this.template = `max-width: 18rem; background:#6AC19E; `
      this.buttonTwo = null
    }
  }
}
</script>

<style scoped>

.BackLog{
  background-color: #292F6C;

}
.ToDo{
  background-color: #4564B0;

}
.OnGoing{
  background-color:#56A7AF;

}
.Finished{
  background-color:#6AC19E;

}

</style>
