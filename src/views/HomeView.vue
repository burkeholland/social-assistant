<script setup>
import ChatThread from '@/components/ChatThread.vue'
import PromptLibrary from '@/components/PromptLibrary.vue'
import DownloadSource from '@/components/DownloadSource.vue'
import SourceEditor from '@/components/SourceEditor.vue'
import ErrorNotification from '@/components/ErrorNotification.vue'
import PromptEditor from '@/components/PromptEditor.vue'

import { useAppStore } from '@/stores/app'
const store = useAppStore()

// subscribe to all state change events to save state to local storage
store.$subscribe((mutation, state) => {
  localStorage.setItem('appState', JSON.stringify(state))
})

// hydrage the state from localStorage
store.hydrateState(JSON.parse(localStorage.getItem('appState')))
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
        <DownloadSource class="block"></DownloadSource>
        <PromptLibrary class="block"></PromptLibrary>
      </div>
      <div class="column is-two-thirds is-flex is-flex-direction-column">
        <ChatThread></ChatThread>
      </div>
    </div>
  </div>

  <SourceEditor></SourceEditor>
  <PromptEditor></PromptEditor>
  <ErrorNotification></ErrorNotification>
</template>

<style scoped>
#sideColumn {
  /* thin grey border on the right side */
  border-right: 1px solid #dbdbdb;
}
</style>
