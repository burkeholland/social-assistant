<script setup>
import ChatThread from '@/components/ChatThread.vue'
import PromptLibrary from '@/components/PromptLibrary.vue'
import Download from '@/components/Download.vue'
import EditSource from '@/components/EditSource.vue'
import ErrorNotification from '@/components/ErrorNotification.vue'
</script>

<template>
  <div class="mt-5 is-flex-grow-1">
    <div class="columns is-full-height">
      <div id="sideColumn" class="column is-one-third pr-5">
        <nav class="pt-2 mb-5">
          <div class="columns is-vcentered">
            <div class="column">
              <h1 class="title">Social Assistant</h1>
            </div>
            <div class="column is-narrow">
              <a href="/logout" class="button">Log Out</a>
            </div>
          </div>
        </nav>
        <Download class="block"></Download>
        <PromptLibrary class="block"></PromptLibrary>
      </div>
      <div class="column is-two-thirds is-flex is-flex-direction-column">
        <ChatThread></ChatThread>
      </div>
    </div>
  </div>

  <EditSource></EditSource>
  <ErrorNotification></ErrorNotification>
</template>

<style scoped>
#sideColumn {
  /* thin grey border on the right side */
  border-right: 1px solid #dbdbdb;
}
</style>
