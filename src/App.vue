<script setup>
import { onBeforeMount } from 'vue'
import { RouterLink, RouterView } from 'vue-router'

onBeforeMount(async () => {
  // call the /.auth/me endpoint to see if we're logged in
  // if not, redirect to the login page
  const me = await getMe()

  console.log(me)

  if (!me) {
    window.location.href = '/login.html'
  }
})

async function getMe() {
  const result = await fetch('/.auth/me')
  const data = await result.json()

  return data.clientPrincipal
}
</script>

<template>
  <main class="container is-flex is-flex-direction-column">
    <nav class="pt-5 mb-5">
      <div class="columns is-vcentered">
        <div class="column">
          <h1 class="title">Social Assistant</h1>
        </div>
        <div class="column is-narrow">
          <a href="/.auth/logout/aad" class="button">Log Out</a>
        </div>
      </div>
    </nav>
    <RouterView />
  </main>
</template>

<style scoped>
.container {
  height: 100%;
  min-height: 100%;
}
</style>
