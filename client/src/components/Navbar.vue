<template>
  <b-navbar toggleable="lg" type="light" style="background-color: #f6f4f7;" class="p-1">
    <b-navbar-brand href="#" id="navbar">
      <img
        src="@/assets/hatchful-logo/logo_transparent.png"
        alt
        style="max-height: 50px; max-width:60px;"
      >
      <!-- <i class="far fa-caret-square-left"></i> Kanban <h3></h3> -->
    </b-navbar-brand>
    <b-navbar-nav active>
      <b-nav-item to="/"><strong>Board</strong></b-nav-item>
      <b-nav-item to="/about"><strong>About</strong></b-nav-item>
      </b-navbar-nav>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-form>
          <b-button v-b-modal.modal-add variant="outline-secondary" size="sm">
            <i class="far fa-plus-square"></i> Task
          </b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style scoped>
#navbar {
  display: flex;
  align-items: center;
}

.fa-caret-square-left {
  margin-right: 10px;
}
</style>
