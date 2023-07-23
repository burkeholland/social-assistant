<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="navbar-brand">
      <h1 class="title">Advocacy AI Assistant</h1>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="columns is-vcentered is-full">
      <RouterLink to="/">
        <span class="nav-item"> Step 1: Source </span>
      </RouterLink>
      <span class="nav-line"></span>
      <RouterLink to="/chat">
        <span class="nav-item">Chat </span>
      </RouterLink>
    </div>
  </nav>
</template>

<style>
nav {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

.nav-item {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 0.25rem;
  padding: 0.5rem 3rem;
  cursor: pointer;
}

.nav-item:hover {
}

.router-link-active {
  background-color: #fff;
  border-color: #ddd;
  border-bottom-color: transparent;
}

.nav-line {
  /* the element should appear as a horiztontal line */
  border-top: 1px solid #ddd;
  display: block;
  height: 0;
  width: 100%;
}
</style>
