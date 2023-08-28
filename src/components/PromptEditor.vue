<script setup>
import { ref } from 'vue'
import { useAppStore } from '@/stores/app'
import { storeToRefs } from 'pinia'
import promptService from '@/services/promptService'

const store = useAppStore()
const { showPromptEditor, promptToSave, userId } = storeToRefs(store)

const modalErrorMessage = ref('')

async function savePrompt(e) {
  // prevent the default form submit behavior
  e.preventDefault()

  try {
    if (validateForm()) {
      const result = await promptService.savePrompt(
        promptToSave.value.id ?? null,
        promptToSave.value.title,
        promptToSave.value.category,
        promptToSave.value.text
      )

      if (result.status === 409) {
        modalErrorMessage.value = 'A prompt with that title already exists'
        return
      }


      store.showPromptEditor = false
      store.prompts = await promptService.getPrompts(userId.value)
    }
  } catch (error) {
    store.errorMessage = error.content
  }
}

function validateForm() {
  modalErrorMessage.value = ''

  if (promptToSave.value.title && promptToSave.value.category && promptToSave.value.text) {
    return true
  }

  modalErrorMessage.value = 'Please fill out all fields'
}

function closeModal(e) {
  e.preventDefault()
  store.showPromptEditor = false
}
</script>

<template>
  <div class="modal" :class="{ 'is-active': showPromptEditor }">
    <div class="modal-background" @click="closeModal"></div>
    <div class="modal-content">
      <form class="form box">
        <div class="field">
          <label for="promptTitle" class="label">Title</label>
          <div class="control">
            <input v-model="promptToSave.title" type="text" name="promptTitle" id="promptTitle" class="input" required />
          </div>
        </div>
        <div class="field">
          <label for="promptType" class="label">Category</label>
          <div class="control">
            <div class="select">
              <select name="promptType" id="promptType" v-model="promptToSave.category">
                <option value="Video">Video</option>
                <option value="Social">Social</option>
                <option value="Blog">Blog</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
        <div class="field">
          <label for="promptToSave" class="label">Prompt</label>
        </div>
        <div class="control">
          <textarea v-model="promptToSave.text" class="block" required></textarea>
          <div class="has-text-right">
            <button class="button mr-2" @click="closeModal">Close</button>
            <button class="button is-primary" @click="savePrompt">Save</button>
          </div>
        </div>
        <div class="is-display-block notification is-danger mt-5" v-if="modalErrorMessage">
          {{ modalErrorMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
textarea {
  resize: none;
  border: 1px solid #dbdbdb;
  width: 100%;
  height: 96px;
  padding: 0.5rem;
  font-size: 1rem;
}
</style>
