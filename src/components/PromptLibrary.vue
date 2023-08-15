<script setup>
import { onMounted, ref, computed } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import promptService from '@/services/promptService'

const store = useAppStore()
const { userMessage, userId } = storeToRefs(store)

const prompts = ref([])
const categories = ref([])
const filterVal = ref('')
const filterBy = ref('')

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
  console.log('filterVal', filterVal.value)

  if (!filterVal.value) {
    return prompts.value
  }

  return prompts.value.filter((prompt) => prompt[filterBy.value] === filterVal.value)
})
</script>

<template>
  <article class="panel is-success">
    <p class="panel-heading">Prompt Library</p>
    <p class="panel-tabs">
      <a
        :class="{ 'is-active': filterVal === '' }"
        @click="
          () => {
            filterVal = ''
            filterBy = 'category'
          }
        "
        v-if="categories.length > 0"
        >All</a
      >
      <a
        v-for="category in categories"
        :key="category"
        @click="
          () => {
            filterVal = category
            filterBy = 'category'
          }
        "
        :class="{ 'is-active': filterVal === category }"
      >
        {{ category }}</a
      >
      <a
        :class="{ 'is-active': filterVal === userId }"
        @click="
          () => {
            filterVal = userId
            filterBy = 'userId'
          }
        "
        >Mine</a
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
