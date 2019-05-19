<template>
<div>
  <div class="container">
    <router-view class='mt-5'/>
  </div>
  <b-button id="show-btn" @click="$bvModal.show('modalCreateNew')" style="position: fixed; bottom:10vh; right:2vw">
    <i class="fas fa-plus"></i> 
  </b-button>
  </div>
</template>

