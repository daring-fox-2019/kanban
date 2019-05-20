<template>
  <div>
    <v-card flat :class="'parentCard ml-2 py-2 ' + childclass">
      <h3 class="subheading mb-1">{{task.title}}</h3>
      <div>Point: {{task.point}}</div>
      <div>Assigned to: {{task.assign}}</div>
      <v-layout class="setting">
        <v-divider class="mt-2"/>
        <div class="mt-2">Description: {{task.description}}</div>
        <div class="text-xs-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="warning--text" dark v-on="on" icon>
                <v-icon small>compare_arrows</v-icon>
              </v-btn>
              <v-btn color="error--text" icon @click="del(task.id)">
                <v-icon small>delete</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-tile
                v-for="(item, index) in items"
                :key="index"
                @click="submit(task.id, item)"
              >
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile>
            </v-list>
          </v-menu>
        </div>
      </v-layout>
    </v-card>
    <v-divider></v-divider>
  </div>
</template>

<script>
import db from "@/firebase/db.js";
import swal from "sweetalert2";
export default {
  data() {
    return {
      items: [
        { title: "backlog" },
        { title: "todo" },
        { title: "doing" },
        { title: "done" }
      ]
    };
  },
  props: ["task", "childclass"],
  components: {},
  methods: {
    submit(id, item) {
      console.log(id, item.title);
      db.collection("tasks")
        .doc(id)
        .update({ status: item.title });
    },
    del(id) {
      console.log(id);
      swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        })
        .then(result => {
          if (result.value) {
            db.collection("tasks")
              .doc(id)
              .delete()
              .then(() => {
                swal.fire("Deleted!", "Your file has been deleted.", "success");
              })
              .catch(err => {
                swal.fire(
                  "The Internet?",
                  "That thing is still around?",
                  "question"
                );
              });
          }
        });
    }
  }
};
</script>


<style>
.Back-Log {
  border-left: 4px solid red;
}
.parentCard:hover {
  transform: scale(1.1);
}
.parentCard:hover > .setting {
  display: inline;
}

.setting {
  display: none;
}
.Todo {
  border-left: 4px solid orange;
}
.Doing {
  border-left: 4px solid blue;
}
.Done {
  border-left: 4px solid green;
}
</style>
