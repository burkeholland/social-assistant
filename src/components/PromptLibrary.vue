<script setup>
import { onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import promptService from '@/services/promptService'

const store = useAppStore()
const { userMessage } = storeToRefs(store)

const prompts = ref([])

onMounted(() => {
  getPrompts()
})

async function getPrompts() {
  prompts.value = await promptService.getPrompts()
}

function setUserMessage(message) {
  userMessage.value = message
}
</script>

<template>
  <article class="panel is-success">
    <p class="panel-heading">Prompt Library</p>
    <div v-for="prompt in prompts" :key="prompt.id" class="panel-block flex is-flex-direction-row">
      <div class="column">
        {{ prompt.promptName }}
      </div>
      <div class="if-flex-justify-content-right mr-3">
        <a @click="setUserMessage(prompt.systemPrompt)">Use</a>
      </div>
    </div>
  </article>
</template>
