<script setup>
import ChatThread from '@/components/ChatThread.vue'
import PromptLibrary from '@/components/PromptLibrary.vue'
import Download from '@/components/Download.vue'
import EditSource from '@/components/EditSource.vue'
</script>

<template>
  <Download></Download>

  <div class="mt-5 is-flex-grow-1">
    <div class="columns is-full-height">
      <div class="column is-two-quarter">
        <PromptLibrary></PromptLibrary>
      </div>
      <div class="column is-three-quarters is-flex is-flex-direction-column">
        <ChatThread></ChatThread>
      </div>
    </div>
  </div>

  <EditSource></EditSource>
</template>
