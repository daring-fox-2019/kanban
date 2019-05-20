<template>
  <div>
    <b-container>
      <b-row class="column-row-header px-3 py-3">
        <!-- <div class="header-left"></div>
        <div class="header-mid row d-flex align-items-center"></div>
        <div class="header-right"></div> -->
      </b-row>
      <b-row>
          <!-- open this modal add -->
          <ModalAdd />
          <!-- modal edit -->
          <ModalEdit v-bind:opt="opt"/>
      </b-row>
      <b-row class="column-row">
        <Column v-for="data in arrayOfObjectByStatus"
          :data="data"
          :key="data.id"
          @open-modal-edit="openModal"/>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Column from '@/components/Column.vue';
import Card from '@/components/Card.vue';
import ModalAdd from '@/components/ModalAdd.vue';
import db from '../api/firebase';
import ModalEdit from '@/components/ModalEdit.vue';

export default {
  name: 'board',
  methods: {
    divideByStatus() {
      this.arrayData.forEach((el) => {
        console.log(el.status);
        console.log(el.task);
      });
    },
    openModal(data) {
      this.opt.id = data.id;
      this.opt.description = data.description;
      this.opt.pic = data.pic;
      this.opt.status = data.status;
      this.opt.task = data.task;
      this.opt.createdAt = data.createdAt;
    },
  },
  components: {
    Column,
    ModalAdd,
    ModalEdit,
  },
  mounted() {
    db.collection('kanban')
      .orderBy('createdAt', 'asc')
      .onSnapshot((querySnapshot) => {
        this.arrayData = [];
        this.arrayByStatus = {
          0: [],
          1: [],
          2: [],
          3: [],
        };
        this.arrayOfObjectByStatus = [
          {
            status: 0,
            name: 'Backlogs',
            icon: '<i class="fas fa-stream"></i>',
            data: [],
          },
          {
            status: 1,
            name: 'Start',
            data: [],
            icon: '<i class="fas fa-play"></i>',
          },
          {
            status: 2,
            name: 'In Progress',
            data: [],
            icon: '<i class="fas fa-spinner"></i>',
          },
          {
            status: 3,
            name: 'Delivered',
            data: [],
            icon: '<i class="fas fa-check"></i>',
          }];
        // / ////
        querySnapshot.forEach((doc) => {
          const obj = { ...doc.data(), id: doc.id };
          this.arrayData.push(obj);

          this.arrayByStatus[obj.status].push(obj);
          this.arrayOfObjectByStatus[obj.status].data.push(obj);
        });
      });
  },
  data() {
    return {
      arrayData: [],
      arrayByStatus: {
        0: [],
        1: [],
        2: [],
        3: [],
      },
      arrayOfObjectByStatus: [{
        status: 0,
        name: 'Backlogs',
        data: [],
      }, {
        status: 1,
        name: 'Start',
        data: [],
      }, {
        status: 2,
        name: 'In Progress',
        data: [],
      }, {
        status: 3,
        name: 'Delivered',
        data: [],
      }],
      selected: null,
      options: [
        { value: 0, text: 'Backlog' },
        { value: 1, text: 'Start' },
        { value: 2, text: 'On progress' },
        { value: 3, text: 'Delivered' },
      ],
      opt: {
        id: '',
        description: '',
        pic: '',
        status: '',
        task: '',
        createdAt: '',
        updatedAt: '',
      },
    };
  },

};
</script>
<style>
.board-column {
  /* border: 1px solid rgb(17, 75, 86);
  border: 1px solid rgba(17, 75, 86, 0.5); */
}
.column-row-header {
  /* border: 1px solid rgb(17, 75, 86);
  border: 1px solid rgba(17, 75, 86, 0.5); */
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px;
}

.column-row {
  display: flex;
  justify-content: space-evenly;
}

#modal-add {
  text-align:left;
}

.modal-footer {
  padding: 0.3rem;
}

h1 {
  margin-bottom: 0px;
}

.column-title {
  padding-left: 0px;
  padding-right: 0px;
  margin-bottom: 20px;
}

.color-0 {
  /* color: #ff9ef3; */
  color: #004445;


}
.color-1 {
  /* color: #ff7259; */
  color: #2c7873;


}
.color-2 {
  /* color: #ffffa5; */
  color: #90Afc5;

}
.color-3 {
  /* color: #99ff93; */
  color: #6fb87f;

}

.background-color {
  background-color: #f6f4f7;
}


.header-mid {
  margin-bottom: 10px;
}
</style>
