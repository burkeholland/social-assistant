<script setup>
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(async () => {
  // call the /.auth/me endpoint to see if we're logged in
  // if not, redirect to the login page
  const me = await getMe()

  if (me) {
    isLoggedIn.value = true
  }
})

async function getMe() {
  const result = await fetch('/.auth/me')
  const data = await result.json()

  return data.clientPrincipal
}
</script>

<template>
  <main class="container is-flex is-flex-direction-column" v-if="isLoggedIn">
    <RouterView />
  </main>
  <div v-else>
    <div class="container">
      <div class="centered">
        <div style="text-align: center">
          <h1 class="title">Advocacy AI Assistant</h1>
          <h2 class="subtitle">Log in with your Microsoft email address</h2>
          <a class="button is-success" href="/.auth/login/aad">Log In</a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  height: 100%;
  min-height: 100%;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
