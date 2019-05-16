<template>
  <div>
  <div class='cardContent Wacana'>
    <h2> {{ item.taskName }} </h2>
    <div class='container-button'>
      <div>
        <h4 class='Wacana' @click='removeItem'>delete</h4>
      </div>
      <div>
        <h4 class='Wacana' @click='actionKiri' v-if='buttonKiri'>{{ buttonKiri }}</h4>
      </div>
      <div>
        <h4 class='Wacana' @click='actionKanan' v-if='buttonKanan'>{{ buttonKanan }}</h4>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import db from '../assets/config.js'
import swal from 'sweetalert'
export default {
  name: 'todo',
  data: function () {
    return {
      buttonKanan: '',
      buttonKiri: ''
    }
  },
  props: ['item', 'name'],
  methods: {
    actionKanan () {
      console.log('geser kanan')
      let updValue = {
        status: this.buttonKanan
      }
      console.log(this.item.id)
      db.collection('todos').doc(this.item.id).update(updValue)
    },
    actionKiri () {
      console.log('geser kiri')
      let updValue = {
        status: this.buttonKiri
      }
      db.collection('todos').doc(this.item.id).update(updValue)
    },
    removeItem () {
      console.log('hapus item')
      swal({
        title: 'Are you sure?',
        text: 'Once deleted, you will not be able to recover this task!',
        icon: 'warning',
        buttons: true,
        dangerMode: true
      })
        .then((willDelete) => {
          if (willDelete) {
            db.collection('todos').doc(this.item.id).delete()
            swal('Task deleted!', {
              icon: 'success'
            })
          }
        })
    }
  },
  created () {
  },
  mounted () {
    if (this.name === 'Wacana') {
      this.buttonKanan = 'Rencana'
      this.buttonKiri = null
    } else if (this.name === 'Rencana') {
      this.buttonKanan = 'On-Going'
      this.buttonKiri = 'Wacana'
    } else if (this.name === 'On-Going') {
      this.buttonKanan = 'Selesai'
      this.buttonKiri = 'Rencana'
    } else if (this.name === 'Selesai') {
      this.buttonKanan = null
      this.buttonKiri = 'On-Going'
    }
  }
}
</script>

<style scoped>
.cardContent {
  font-size: 10px;
  background-color: grey;
  color: #fff;
  width: 70%;
  min-height: 100px;
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
  color: grey ;
  background-color: #fff;
  margin-left: auto;
  margin-right: auto;
  text-align: center;
  width: 30%;
  padding: 2%;
  border-radius: 5px;
}
</style>
