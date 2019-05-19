<template>
  <div style=";width:100%; margin-top:200px">
   <div style="display:flex;justify-content:center;align-items:center"> 
        <h1 style="font-size:40px" class="mr-5"> <span style="color:grey">Kanban</span> <br> Login First ! </h1>
        <img src="../assets/google.png" width="200px" height="200px" class="login-button" @click="loginGoogle">
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    initFirebaseAuth() {
      let config = {
        apiKey: process.env.VUE_APP_apiKey,
        authDomain: process.env.VUE_APP_authDomain,
        databaseURL: process.env.VUE_APP_DATABASE_URL,
        projectId: process.env.VUE_APP_projectId,
        storageBucket: process.env.VUE_APP_storageBucket
      };

      if (!firebase.apps.length) {
        firebase.initializeApp(config);
      }
    },
    loginGoogle() {
      this.initFirebaseAuth();
      let provider = new firebase.auth.GoogleAuthProvider();

      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken;
          localStorage.setItem("token", token);

          let user = result.user;
          localStorage.setItem("userName", user.displayName);
          this.$router.push('/')
        })
        .catch(error => {
          console.log(error);
        });
    },
  }
};
</script>

<style scoped>
    .login-button{
        -webkit-box-shadow: 9px 10px 0px 0px rgba(224,224,224,1);
        -moz-box-shadow: 9px 10px 0px 0px rgba(224,224,224,1);
        box-shadow: 9px 10px 0px 0px rgba(224,224,224,1);
        border-radius: 50px;
        padding: 20px;
    }
</style>

