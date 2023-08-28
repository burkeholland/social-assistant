<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useAppStore } from '@/stores/app'
import downloadService from '@/services/downloadService'

const store = useAppStore()

const url = ref('')
const isSet = ref(false)
const isLoading = ref(false)
const isInvalid = ref(false)

async function setSource() {
  try {
    new URL(url.value)
    isInvalid.value = false
  } catch {
    isInvalid.value = true
  }

  isLoading.value = true

  const result = await downloadService.downloadSourceContent(url.value)
  setStoreState(url.value, result.body.content)

  isSet.value = true
  isLoading.value = false
}

function clearSource() {
  setStoreState('', '')

  url.value = ''
  isSet.value = false
}

function setStoreState(url, content) {
  store[`${props.targetType}Url`] = url
  store[`${props.targetType}Content`] = content
}

const props = defineProps({
  targetType: {
    type: String,
    required: true
  },
  instructions: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
})

onMounted(() => {
  const stateUrl = store[`${props.targetType}Url`]

  if (stateUrl) {
    url.value = stateUrl
    isSet.value = true
  }
})

</script>

<template>
  <div class="mb-3">
    <label class="label" for="style">{{ label }}</label>
    <div class="field has-addons mb-0">
      <div class="control is-expanded">
        <input class="input is-success is-small" type="text" name="style" placeholder="Blog post, ect" v-model="url"
          :disabled="isSet" />
      </div>
      <div class="control" v-if="!isSet">
        <button class="button is-primary is-pulled-right is-small" :class="{ 'is-loading': isLoading }" :disabled="!url"
          @click="setSource">
          Set
        </button>
      </div>
      <!-- <div class="control" v-if="isSet">
      <button class="button is-primary is-small" @click="showEditor">Edit</button>
    </div> -->
      <div class="control" v-if="isSet">
        <button class="button is-danger is-small" @click="clearSource">Clear</button>
      </div>
    </div>
    <div v-if="isInvalid">
      <p class="is-size-7 has-text-danger">
        Please enter a valid URL with the protocal (http/https)
      </p>
    </div>
    <p class="is-size-7 mt-1">{{ instructions }}</p>
  </div>
</template>