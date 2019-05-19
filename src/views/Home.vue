<template>
  <div>
    <div class="row justify-content-around">
      <panel class="col-sm-3 mx-0 px-0" v-for="panel in panels" :panel="panel" @detail='showDetail' :key="panel.text"/>
    </div>
    <createNewModal/>
    <detail :todo='detailTodo'/>
  </div>
</template>

<script>
// @ is an alias to /src
import panel from "@/components/panel.vue";
import { db } from "@/main.js";
import createNewModal from "@/components/createNew.vue"
import detail from "@/components/detail.vue"

export default {
  name: "home",
  data() {
    return {
      panels: [
        {
          text: "Back-Log",
          color: "danger",
          colorCSS: "red"
        },
        {
          text: "Todo",
          color: "warning",
          colorCSS: "orange"
        },
        {
          text: "Doing",
          color: "primary",
          colorCSS: "blue"
        },
        {
          text: "Done",
          color: "success",
          colorCSS: "green"
        }
    ],
    detailTodo:''
    };
  },
  methods:{
    showDetail(data){
      this.$bvModal.show('detail')
      this.detailTodo = data
    }
  },
  components: {
    panel,
    createNewModal,
    detail
  }
};
</script>
