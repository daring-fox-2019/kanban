<template>
  <v-app>
    <v-content>
      <v-container>
        <Form class="mb-3"/>
        <v-layout justify-space-around row>
          <CardParent :cardType="backLog"/>
          <CardParent :cardType="todo"/>
          <CardParent :cardType="doing"/>
          <CardParent :cardType="done"/>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer dark height="auto">
      <v-card class="flex" flat tile>
        <v-card-title class="teal">
          <strong class="subheading">Get connected with me at -></strong>
        </v-card-title>

        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 —
          <strong>Dion Michael</strong>
        </v-card-actions>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script>
import CardParent from "./components/CardParent";
import Form from "./components/Form";
import db from "./firebase/db.js";
export default {
  name: "App",
  components: {
    CardParent,
    Form
  },
  data() {
    return {
      backLog: {
        title: "Back-Log",
        statusColor: "error",
        ref: "backlog"
      },
      todo: {
        title: "Todo",
        statusColor: "warning",
        ref: "todo"
      },
      doing: {
        title: "Doing",
        statusColor: "primary",
        ref: "doing"
      },
      done: {
        title: "Done",
        statusColor: "success",
        ref: "done"
      },
      name: "",
      email: "",
      user: {
        name: "",
        email: ""
      },
      users: [],
      tasks: []
    };
  },
  methods: {
    async saveData(user) {
      let save = await db.collection("users").add({
        name: user.name,
        email: user.email
      });
      console.log(`data saved with ID : ${save.id}`);
    }
  },
  created() {
    console.log(this.count);
  },
  firestore: {
    users: db.collection("users"),
    tasks: db.collection("tasks")
  },
  computed: {
    count() {
      return this.$store.state.count;
    }
  }
};
</script>
