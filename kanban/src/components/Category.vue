<template>
  <div id="kotak">
    <h2 :style="{'background-color': bgcolor}">{{category}}</h2>
    <!-- <br><br> -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Category',
  props: ['category', 'bgcolor'],
};

</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css?family=Noto+Sans:400,700');
  h2 {
    font-family: 'Noto Sans', sans-serif;
    font-weight: 700;
    margin-bottom: 50px;
    background-clip: padding-box;
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    border-bottom: 5px solid black;
    text-align: center;
  }

  div#kotak {
    border-radius: 50px;
    margin: 50px auto;
    border: 5px solid black;
    background-color: rgba(255,255,255,0.7)
  }


</style>
