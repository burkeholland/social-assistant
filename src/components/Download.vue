<script setup>
import { useDownloadStore } from '@/stores/download'
import { storeToRefs } from 'pinia'

const { downloadUrl } = storeToRefs(useDownloadStore())
const { downloadSourceContent } = useDownloadStore()
</script>

<template>
  <article class="panel is-success">
    <p class="panel-heading">Download</p>
    <div class="panel-block">
      <p>Enter a URL and we will attempt to download the content/captions for you.</p>
    </div>
    <div class="panel-block">
      <p class="control">
        <input
          class="input is-success block"
          type="text"
          placeholder="Enter a URL to download content"
          v-model="downloadUrl"
        />
        <button class="button is-primary is-pulled-right" @click="downloadSourceContent">
          Download
        </button>
      </p>
    </div>
  </article>
</template>
