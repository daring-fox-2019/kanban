<template>
<!-- color-'+data.status -->
    <div class="col-12 board-column col-md-6 col-sm-6 col-lg-6 col-xl-3">
        <b-container fluid
        :class="'background-color border py-2 column-title'">
        <b-row 
          style="font-size:20px;"
          class="d-flex align-items-center justify-content-center">
          <strong>{{data.name}}</strong>&nbsp;&nbsp;<div v-html="data.icon"></div>
        </b-row>
        </b-container>
          <draggable
            v-model="data.data"
            group="people"
            @start="drag=true"
            @end="drag=false"
            style="height: 60vh;"
            :move="checkMove"
            :class="'column-title'"
            :id="data.status">
            <div v-for="card in data.data"
                :key="card.id">
                <Card v-bind:card_data="card"
                  :card_status="data.status"
                  @test="test"
                  @update:single-data="openModal"/>
            </div>
          </draggable>
    </div>
</template>

<script>
import db from '@/api/firebase.js';
import Card from '@/components/Card.vue';
import draggable from 'vuedraggable';

export default {
  name: 'column',
  props: ['data'],
  components: {
    Card,
    draggable,
  },
  created() {
    this.debouncedUpdateDraggedCard = _.debounce(this.updateDraggedCard, 1000);
  },
  methods: {
    openModal(x) {
      this.$emit('open-modal-edit', x);
    },
    test() {
      console.log('dapet nih test');
    },
    checkMove(evt) {
      // console.log(evt.draggedContext.element.id)
      // console.log(evt.to.id)
      this.target_status = evt.to.id;
      this.dragged_id = evt.draggedContext.element.id;
      this.debouncedUpdateDraggedCard();
    },
    updateDraggedCard(id) {
      // console.log('yeye')
      // console.log(this.data.status)
      db.collection('kanban')
        .doc(this.dragged_id)
        .update({
          status: this.target_status,
        })
        .then(() => {
          console.log('dragged and saved :-)');
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {},
};
</script>

<style>

</style>
