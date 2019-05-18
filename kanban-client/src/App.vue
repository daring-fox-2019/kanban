<template>
  <v-app>
    <v-toolbar app color="primary">
      <v-toolbar-title class="headline text-uppercase mr-4">
        <span>MY </span>
        <span class="font-weight-light">Kanban</span>
      </v-toolbar-title>
      <v-menu
        transition="slide-x-transition"
        :close-on-content-click="false"
        v-model="menu"
        bottom
        right
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on">Add Todo</v-btn>
        </template>
        <v-card width="300">
          <v-card-text>
            <v-form lazy-validation ref="form">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    label="Title"
                    v-model="newTodo.title"
                    required
                    :rules="requiredRule"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Description"
                    v-model="newTodo.description"
                    required
                    :rules="requiredRule"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field
                    label="Assign to"
                    v-model="newTodo.assigned"
                    required
                    :rules="requiredRule"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <label for="priority">Priority</label>
                </v-flex>
                <v-flex xs8>
                  <v-slider label=" " v-model="newTodo.point" :rules="priorityRule"></v-slider>
                </v-flex>
                <v-flex xs3 class="ml-3">
                  <v-text-field type="number" v-model="newTodo.point" :rules="priorityRule"></v-text-field>
                </v-flex>
                <v-flex style="display: flex; justify-content: space-between;">
                  <v-btn color="error" @click="emptyForm">Cancel</v-btn>
                  <v-btn color="primary" @click.prevent="validate">Submit</v-btn>
                </v-flex>
              </v-layout>
            </v-form>
          </v-card-text>
        </v-card>
      </v-menu>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-content grid-list-lg text-xs-center>
      <!-- konten dari sini -->
      <v-layout row>
        <board
          v-for="(item, index) in categories"
          :header="item.name"
          :category="item"
          :key="index"
        />
      </v-layout>
    </v-content>
  </v-app>
</template>

<script>
import board from "./components/board.vue";
import db from "./api/firebase.js";

export default {
  name: "App",
  components: {
    board
  },
  data() {
    return {
      menu: false,
      validInput: true,
      priorityRule: [v => v <= 100 || "0 - 100", v => v >= 0 || "0 - 100"],
      requiredRule: [v => !!v || "Field required"],
      categories: [
        {
          name: "Back-log",
          todos: [],
          color: "red"
        },
        {
          name: "To-Do",
          todos: [],
          color: "yellow"
        },
        {
          name: "On-Going",
          todos: [],
          color: "blue"
        },
        {
          name: "Finished",
          todos: [],
          color: "green"
        }
      ],
      newTodo: {
        title: "",
        description: "",
        point: 0,
        assigned: ""
      }
    };
  },
  methods: {
    createTodo() {
      let { title, description, point, assigned } = this.newTodo;
      db.collection("Tasks")
        .add({
          title,
          description,
          point,
          assigned,
          status: "Back-log",
          createdAt: new Date()
        })
        .then(docref => {
          this.emptyForm();
          swal("Success!", "Todo created!", "success");
        })
        .catch(err => {
          console.log({ err, dari: "create" });
        });
    },
    validate() {
      if (this.$refs.form.validate() && this.validInput) {
        this.snackbar = true;
        this.createTodo();
      } else {
        swal("Invalid Input");
      }
    },
    emptyForm() {
      this.menu = false
      this.$refs.form.resetValidation();
      this.$refs.form.reset();
      this.newTodo.point = 0
    }
  },
  created() {
    db.collection("Tasks").onSnapshot(snapshot => {
      const temp = [];
      this.categories.forEach(item => {
        item.todos = [];
      });
      snapshot.forEach(change => {
        const entry = change.data();
        const { id } = change;
        entry.id = id;
        this.categories.forEach(item => {
          if (entry.status == item.name) {
            item.todos.push(entry);
          }
        });
        temp.push(entry);
      });
    });
  }
};
</script>
