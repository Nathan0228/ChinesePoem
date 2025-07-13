<template>
  <RouterLink to="/" class="header-link">
    <div class="header">
      <!-- <img src="../assets/logo.png" alt="logo" class="logo"> -->
      <div class="title">
        <h1>Chinese Poem Daily</h1>
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">

</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70px;
  background-color: #f9f5e4;
}
.logo {
  width: 50px;
  height: 50px;
}
.title {
  font-size: 1.0rem;
  font-weight: bold;

}
.header-link {
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: inherit;
}
.header-link:hover .header {
  background: #e0dbc0;
  cursor: pointer;
}
.title h1 {
  transition: color 0.2s;
}
.title h1:hover {
  color: #83c75e;
  cursor: pointer;
}
</style>
