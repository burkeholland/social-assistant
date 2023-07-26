<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <main class="container is-flex is-flex-direction-column">
    <NavBar />
    <RouterView />
  </main>
</template>

<style scoped>
.container {
  height: 100%;
  min-height: 100%;
}
</style>
