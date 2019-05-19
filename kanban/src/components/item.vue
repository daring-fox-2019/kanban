<template>
  <b-card class="mb-2">
    <b-card-text>
      <transition name="fade">
        <div v-if="!editMode" class="text-right" key="1">
          <b-button variant="primary" @click="editThisOne" size="sm">
            <font-awesome-icon icon="edit" size="sm"/>
          </b-button>
          <b-button variant="danger" @click="remove" size="sm">
            <font-awesome-icon icon="trash" size="sm"/>
          </b-button>
          <div>
            <br>
          </div>
          <div class="text-left">desc: {{task.desc}}</div>
          <div class="text-left">point: {{task.point}}</div>
        </div>

        <div v-else class="text-right" key="2">
          <div class="text-left">
            desc:
            <b-form-input v-model="newTask.desc"></b-form-input>
          </div>
          <div class="text-left">
            point:
            <b-form-input v-model="newTask.point" type="number"></b-form-input>
          </div>
          <div class="text-left">
            status:
            <b-form-select v-model="newTask.status" :options="options" size="sm" class="mt-3"></b-form-select>
          </div>
          <br>
          <div class="row" v-if="!addMode">
            <div class="c ol-6">
              <b-button variant="success" size="sm" @click="saveThisOne">
                <font-awesome-icon icon="save" size="sm"/>save
              </b-button>
            </div>
            <div class="col">
              <b-button variant="danger" @click="editMode=false" size="sm">
                <font-awesome-icon icon="sign-out-alt" size="sm"/>cancel
              </b-button>
            </div>
          </div>

          <div class="row" v-if="addMode">
            <div class="col-6">
              <b-button v-if="addMode" variant="success" @click="addThisOne" size="sm">+ add</b-button>
            </div>
            <div class="col-6">
              <b-button v-if="addMode" variant="secondary" @click="cancelThisOne" size="sm">cancel</b-button>
            </div>
          </div>
        </div>
      </transition>
    </b-card-text>
    <div class="row" v-if="!editMode">
      <div class="col-6">
        <b-button :disabled="task.status<=1" variant="info" @click="goLeft">
          <font-awesome-icon icon="arrow-left"/>
        </b-button>
      </div>
      <div class="col-6">
        <b-button :disabled="task.status>=4" variant="success" @click="goRight">
          <font-awesome-icon icon="arrow-right"/>
        </b-button>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  name: "Item",
  props: {
    task: { type: Object }
  },

  data() {
    return {
      newTask: {},
      editMode: false,
      options: [
        { value: 1, text: "back log" },
        { value: 2, text: "to-do" },
        { value: 3, text: "doing" },
        { value: 4, text: "done" }
      ]
    };
  },
  mounted() {
    if (
      Object.entries(this.task).length === 0 &&
      this.task.constructor === Object
    )
      this.editMode = true;
  },
  computed: {
    addMode: function() {
      return (
        Object.entries(this.task).length === 0 &&
        this.task.constructor === Object
      );
    }
  },
  methods: {
    update() {
      this.$emit("update", this.newTask);
      this.newTask = {};
    },
    goLeft() {
      this.newTask = { ...this.task };
      this.newTask.status--;
      this.update();
    },
    goRight() {
      this.newTask = { ...this.task };
      this.newTask.status++;
      this.update();
    },
    editThisOne() {
      this.newTask = { ...this.task };
      this.editMode = true;
      // this.update();
    },
    addThisOne() {
      this.$emit("create", this.newTask);
      this.$emit("exitmodal");
    },
    cancelThisOne() {
      this.$emit("exitmodal");
    },
    saveThisOne() {
      this.editMode = false;
      this.update();
      // this.update();
    },
    remove() {
      this.$emit("remove", this.task.id);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter, .fade-leave /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
