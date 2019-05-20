<template>
  <div class="card animated rollOut">
    <div class="c-header">
      <div class="color-0" v-show="card_status == 0"></div>
      <div class="color-1" v-show="card_status == 1"></div>
      <div class="color-2" v-show="card_status == 2"></div>
      <div class="color-3" v-show="card_status == 3"></div>
    </div>
    <div class="c-main">
      <div
        class="c-title pl-1 pr-2"
        style="max-height: 80px; height: 87px;overflow:hidden;"
      >{{card_data.task}}</div>
      <div class="c-description">Desc: {{card_data.description}}</div>

      <!-- <div class="c-description">status: {{card_data.status}}</div> -->
    </div>
    <div class="c-footer">
      <div class="pl-1">PIC: {{card_data.pic}}</div>

      <div>
        <b-button
          variant="outline-dark"
          size="sm"
          class="button-so-small"
          :disabled="card_data.status <= 0"
          @click="moveLeft(card_data.id)"
        >
          <i class="fas fa-angle-left"></i>
        </b-button>
        <b-button
          variant="outline-dark"
          size="sm"
          class="button-so-small"
          :disabled="card_data.status >= 3"
          @click="moveRight(card_data.id)"
        >
          <i class="fas fa-angle-right"></i>
        </b-button>
        <b-button
          v-b-modal.modal-edit
          variant="outline-dark"
          size="sm"
          class="button-so-small"
          @click="emitData"
        >
          <i class="far fa-edit"></i> Task
        </b-button>
        <b-button
          variant="outline-dark"
          size="sm"
          class="button-so-small"
          @click="deleteData(card_data.id)"
        >
          <i class="fas fa-times"></i>
        </b-button>
      </div>
    </div>
    <!-- <ModalEdit /> -->
  </div>
</template>

<script>
import ModalEdit from "@/components/ModalEdit.vue";
import db from "@/api/firebase.js";

export default {
  props: ["card_data", "card_status"],
  name: "Card",
  data() {
    return {};
  },
  components: {
    ModalEdit
  },
  methods: {
    moveRight(id) {
      // console.log(id)
      db.collection("kanban")
        .doc(id)
        .update({
          status: this.card_data.status + 1
        })
        .then(() => {
          console.log("moved to the right");
        })
        .catch(err => {
          console.log(err);
        });
    },
    moveLeft(id) {
      // console.log(id)
      db.collection("kanban")
        .doc(id)
        .update({
          status: this.card_data.status - 1
        })
        .then(() => {
          console.log("moved to the left");
        })
        .catch(err => {
          console.log(err);
        });
    },
    emitData() {
      // console.log(this.emit_data)
      // console.log("emit dataaaah")
      // console.log("fungsi kepanggil");
      // console.log(this.card_data, "<-----");
      this.$emit("test");
      this.$emit("update:single-data", this.card_data);
    },
    deleteData(input) {
      this.$swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          db.collection("kanban")
            .doc(input)
            .delete()
            .then(() => {
              console.log(`successfully deleted id: ${input} kanban`);
              this.$swal("Deleted!", "Your file has been deleted.", "success");
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    }
  }
};
</script>
<style scoped>
.btn-sm {
  padding: 0.1rem 0.5rem;
  font-size: 0.675rem;
  line-height: 1;
  border-radius: 0.2rem;
  height: 20px;
  margin-right: 3px;
}

.card {
  border: 1px solid rgb(17, 75, 86);
  border: 1px solid rgba(17, 75, 86, 0.5);
  /* margin: 5px; */
  margin-bottom: 10px;
  display: flex;
}

.color-0,
.color-1,
.color-2,
.color-3 {
  height: 100%;
  width: 100%;
  background-color: #a753b1;
  border-radius: 5px;
  margin: 2px;
}

.color-0 {
  /* background-color: #ff9ef3; */
  background-color: #004445;
}
.color-1 {
  /* background-color: #ff7259; */
  background-color: #2c7873;
}
.color-2 {
  /* background-color: #ffffa5; */
  background-color: #90afc5;
}
.color-3 {
  /* background-color: #99ff93; */
  background-color: #6fb87f;
}

.c-title {
  width: 100%;
  font-size: 1.6rem;
}
.c-description {
  width: 100%;
  font-size: 0.75rem;
}

.c-header {
  padding: 5px;
  font-size: 0.5vw;
  height: 20px;
  flex-grow: 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
}
.c-main {
  padding-left: 8px;
  flex-grow: 1;
  /* display: flex;
  justify-content:flex-start; */
  text-align: left;
  overflow: hidden;
}
.c-footer {
  height: 30px;
  padding: 3px;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
}
</style>
