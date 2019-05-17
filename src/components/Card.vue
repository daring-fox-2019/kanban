<template>
  <div class="ui fluid card" :class="[ color ]">
    <div class="center aligned content">
      <h1>{{ item.title }}</h1>
    </div>
      <div class="ui basic small buttons">
        <button class="ui icon button"
          @click="removeItem" >
          <i class="trash icon"></i>
        </button>
        <button class="ui icon button"
          v-if="this.buttonOne"
          @click="actionOne">
          <i class="left arrow icon"></i>
        </button>
        <button class="ui icon button"
          v-if="this.buttonTwo"
          @click="actionTwo">
          <i class="right arrow icon"></i
        ></button>
      </div>
    </div>
</template>

<script>
import database from '@/firebase/init';

export default {
  name: 'Card',
  props: {
    item: Object,
    name: String,
    color: String,
  },
  data() {
    return {
      buttonOne: '',
      buttonTwo: '',
    };
  },
  methods: {
    actionOne() {
      database.ref(`/${this.item.id}`).remove();
      database.ref('/').push({
        title: this.item.title,
        status: this.buttonOne,
      });
    },
    actionTwo() {
      database.ref(`/${this.item.id}`).remove();
      database.ref('/').push({
        title: this.item.title,
        status: this.buttonTwo,
      });
    },
    removeItem() {
      database.ref(`/${this.item.id}`).remove();
    },
  },
  created() {
    console.log(this.name);
    if (this.name === 'Idea') {
      this.buttonOne = null;
      this.buttonTwo = 'Todo';
    } else if (this.name === 'Todo') {
      this.buttonOne = 'Idea';
      this.buttonTwo = 'Doing';
    } else if (this.name === 'Doing') {
      this.buttonOne = 'Todo';
      this.buttonTwo = 'Finished';
    } else if (this.name === 'Finished') {
      this.buttonOne = 'Doing';
      this.buttonTwo = null;
    }
  },
};
</script>

<style>
#kartu {
  margin-left: auto;
  margin-right: auto;
  /* text-align: center; */
  margin-bottom: 50px;
  vertical-align: middle;
  cursor: pointer;
  padding-bottom: 20px;
  width: 70%;
}
</style>
