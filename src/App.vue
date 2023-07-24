<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div class="container flex is-flex-direction-column is-fullheight">
    <NavBar />
    <main class="main flex is-flex-direction-column is-justify-content-center">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  min-height: 100%;
}
</style>
