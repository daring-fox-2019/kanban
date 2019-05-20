<template>
  <div>
    <v-toolbar :color="basic.color" dark>
      <v-toolbar-title>{{basic.name}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <subTask :basic="basic" v-if='basic.name=="Backlog"'></subTask>
    <subTask :basic="basic" v-if='basic.name=="Todo"'></subTask>
    <subTask :basic="basic" v-if='basic.name=="Doing"'></subTask>
    <subTask :basic="basic" v-if='basic.name=="Done"'></subTask>

  </div>
</template>

<script>
import subTask from "../components/subTask.vue";

export default {
  props: ["basic"],
  components: {
    subTask
  }
};
</script>

