<template>
<div class="column">
  <div class="ui segment" :class="[ color ]">
    <h3 class="ui top attached centered header" :class="[ color ]">
      {{ data.name }}
    </h3>
    <div class="ui stackable cards">
    <Card
      v-for="(item, index) in data.tasks"
      :key="index"
      :item="item"
      :name="data.name"
      :color="color"
      />
    </div>
  </div>
</div>

</template>

<script>
import Card from '@/components/Card.vue';

export default {
  name: 'Segment',
  props: {
    data: Object,
  },
  components: {
    Card,
  },
  computed: {
    color() {
      switch (this.data.name) {
        case 'Idea':
          return 'olive';
          break;
        case 'Todo':
          return 'yellow';
          break;
        case 'Doing':
          return 'green';
          break;
        case 'Finished':
          return 'blue';
          break;
        default:
          return '';
          break;
      }
    },
  },
};
</script>

<style>
.ui.four.wide.segment {
  padding: 20px;
}
</style>
