<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import promptService from '@/services/promptService'

const store = useAppStore()
const { userMessage } = storeToRefs(store)

const prompts = ref([])
const categories = ref([])
const filterCategory = ref('')

onMounted(() => {
  getPrompts()
})

async function getPrompts() {
  try {
    // get all prompts from db
    prompts.value = await promptService.getPrompts()

    // get the distinct categories from the prompts result
    categories.value = [...new Set(prompts.value.map((prompt) => prompt.category))]
  } catch (error) {
    store.errorMessage = error.content
  }
}

function setUserMessage(message) {
  userMessage.value = message
}

const filteredPrompts = computed(() => {
  if (!filterCategory.value) {
    return prompts.value
  }

  return prompts.value.filter((prompt) => prompt.category === filterCategory.value)
})

const myPrompts = computed(() => {
  
})
</script>

<template>
  <article class="panel is-success">
    <p class="panel-heading">Prompt Library</p>
    <p class="panel-tabs">
      <a
        :class="{ 'is-active': filterCategory === '' }"
        @click="filterCategory = ''"
        v-if="categories.length > 0"
        >All</a
      >
      <a
        v-for="category in categories"
        :key="category"
        @click="filterCategory = category"
        :class="{ 'is-active': filterCategory === category }"
      >
        {{ category }}</a
      >
    </p>
    <div
      v-for="prompt in filteredPrompts"
      :key="prompt.id"
      class="panel-block flex is-justify-content-space-between is-align-items-center"
    >
      <div>
        {{ prompt.title }}
      </div>
      <div class="is-align-self-flex-end mr-3">
        <a @click="setUserMessage(prompt.text)">Use</a>
      </div>
    </div>
  </article>
</template>
