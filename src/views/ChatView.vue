<script setup>
import ChatBox from '../components/ChatBox.vue'
</script>

<template>
  <main>
    <div>
      <div class="message user-message is-flex">User</div>
      <div class="message system-message is-flex">GPT</div>
      <div class="message user-message is-flex is-justify-content-center">User</div>
    </div>
  </main>
  <footer>
    <ChatBox />
  </footer>
</template>

<style>
/* the user message and system message should have different backgrounds */
.user-message {
  background-color: #f5f5f5;
}

.system-message {
  background-color: #fff;
}

.message {
  height: 100px;
}

footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background-color: #fff;
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: center;
}
</style>
