<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'

const sourceIsActive = ref(true)
const chatIsActive = ref(false)

function setActive(tab) {
  sourceIsActive.value = tab === 'source'
  chatIsActive.value = tab === 'chat'
}
</script>

<template>
  <nav class="pt-5 mb-5">
    <div class="navbar-brand">
      <h1 class="title">Advocacy AI Assistant</h1>

      <div class="navbar-menu">
        <div class="navbar-end">
          <a href="login.html" class="button">Log Out</a>
        </div>
      </div>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
    <div class="tabs is-boxed">
      <ul>
        <RouterLink
          active-class="is-active"
          to="/"
          v-slot="{ href, route, navigate, isActive, isExactActive }"
          custom
        >
          <li :class="[isActive && 'is-active']">
            <a href="href" @click="navigate">Source</a>
          </li>
        </RouterLink>
        <RouterLink to="/chat" v-slot="{ href, route, navigate, isActive, isExactActive }" custom>
          <li :class="[isActive && 'is-active']">
            <a @click="navigate" href="/chat">Chat</a>
          </li>
        </RouterLink>
      </ul>
    </div>
  </nav>
</template>

<style scoped></style>
