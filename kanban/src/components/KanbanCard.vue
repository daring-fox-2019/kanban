<template>
  <div style= "border-style:dashed;  border-color:lightpurple; " class="hehe card">
    <h3 style="color:rgb(166,208,255);">
      <div>
        <img v-if="data.name == 'Backlog'" src="https://i.ibb.co/68CM6C3/pr1.gif">
        <img v-else-if="data.name == 'To-Do'" src="https://i.ibb.co/sCdMbXZ/pr5.gif">
        <img v-else-if="data.name == 'On-Going'" src="https://i.ibb.co/nP9jnK6/pr3.gif">
        <img v-else-if="data.name == 'Finished'" src="https://i.ibb.co/W023gyp/pr4.gif">
      </div>
      
      </h3>
    <ContentCard v-for="(item) in data.data" :key="item.id" :item="item" :name="data.name"></ContentCard>
  </div>
</template>

<script>
import ContentCard from "@/components/ContentCard.vue";
export default {
  name: "KanbanCard",
  components: {
    ContentCard
  },
  data: function() {
    return {};
  },
  props: ["data"],
  created() {
    this.cardTitle = this.title;
  }
};
</script>

<style scoped>

.hehe {
  background-color: #cde1f3a9 !important;
}
</style>
