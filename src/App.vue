<script setup>
import { RouterLink, RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <nav>
    <div class="container">
      <NavBar />
      <RouterView />
    </div>
  </nav>
</template>

<style scoped></style>
