<script setup>
import ChatBox from '../components/ChatBox.vue'
import ChatMessage from '../components/ChatMessage.vue'
</script>

<template>
  <section class="section">
    <div v-for="message in messages" :key="message.id">
      <ChatMessage :message="message"></ChatMessage>
    </div>
    <footer>
      <ChatBox />
    </footer>
  </section>
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
