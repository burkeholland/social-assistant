<script setup>
import { onMounted } from 'vue'
import { usePromptStore } from '@/stores/prompt'
import { storeToRefs } from 'pinia'

const { prompts } = storeToRefs(usePromptStore())
const { getPrompts, setCurrentPrompt } = usePromptStore()

onMounted(() => {
  getPrompts()
})
</script>

<template>
  <article class="panel is-success">
    <p class="panel-heading">Prompt Library</p>
    <a
      @click="setCurrentPrompt(prompt.id)"
      v-for="prompt in prompts"
      :key="prompt.id"
      class="panel-block"
    >
      {{ prompt.promptName }}
    </a>
  </article>
</template>
