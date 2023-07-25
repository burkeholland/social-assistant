<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <div class="navbar-brand">
      <h1 class="title mt-5">Advocacy AI Assistant</h1>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="tabs is-boxed">
      <ul>
        <li>
          <RouterLink to="/">
            <span class="icon is-small"><i class="fas fa-image" aria-hidden="true"></i></span>
            <span>Source</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink to="/chat">
            <span class="icon is-small"><i class="fas fa-music" aria-hidden="true"></i></span>
            <span>Prompt</span>
          </RouterLink>
        </li>
      </ul>
    </div>
    <!-- <div class="columns is-vcentered mt-3">
      <RouterLink to="/">
        <span class="nav-item"> Step 1: Source </span>
      </RouterLink>
      <span class="nav-line"></span>
      <RouterLink to="/chat">
        <span class="nav-item">Step 2: Prompt </span>
      </RouterLink>
    </div> -->
  </nav>
</template>

<style scoped></style>
