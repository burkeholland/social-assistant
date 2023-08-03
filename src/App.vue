<script setup>
import { ref, onMounted } from 'vue'

const isLoggedIn = ref(false)

onMounted(async () => {
  // check that the user is authenticated and that they are a microsoft.com or github.com employee
  checkAuth()
})

async function checkAuth() {
  const result = await fetch('/.auth/me')
  const data = await result.json()

  const clientPrincipal = data.clientPrincipal

  // user is not authorized or their auth has expired
  if (clientPrincipal === null) {
    return (isLoggedIn.value = false)
  }

  // get the domain part of the userDetails email address
  const domain = clientPrincipal.userDetails.split('@')[1]

  // if the domain isn't microsoft.com or github.com, redirect to the login page
  if (domain !== 'microsoft.com' && domain !== 'github.com') {
    return
  }

  isLoggedIn.value = true
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
          <h1 class="title">Social Assistant</h1>
          <h2 class="subtitle">Log in with your microsoft.com or github.com email address</h2>
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
