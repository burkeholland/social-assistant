<script setup>
import SetSource from '@/components/SetSource.vue'
</script>
<template>
  <div>
    <SetSource targetType="context" label="Context"
      instructions="Use this to provide the content you want to use as the context for this chat">
    </SetSource>
    <SetSource targetType="reference" label="Style Reference"
      instructions="Use this to reference a style that you would like the model to emulate">
    </SetSource>
    <!-- <label class="label" for="context">Context</label>
    <div class="field has-addons mt-2 mb-0">
      <div class="control is-expanded">
        <input class="input is-success is-small" type="text" name="context"
          placeholder="YouTube video, Release notes, Documentation, etc." v-model="contextUrl"
          :disabled="context.isSet" />
      </div>
      <div class="control" v-if="!context.isSet">
        <button class="button is-primary is-pulled-right is-small" :class="{ 'is-loading': context.isLoading }"
          :disabled="!contextUrl" @click="setContext">
          Set
        </button>
      </div>
      <div class="control" v-if="context.isSet">
        <button class="button is-primary is-small" @click="showEditor">Edit</button>
      </div>
      <div class="control" v-if="context.isSet">
        <button class="button is-danger is-small" @click="clearContext">Clear</button>
      </div>
    </div>
    <div v-if="context.isInvalid">
      <p class="is-size-7 has-text-danger">
        Please enter a valid URL with the protocal (http/https)
      </p>
    </div>
    <p class="is-size-7 mb-2 mt-1">Use this to provide the content you want to use as the context for this chat</p>
    <label class="label" for="style">Style Reference</label>
    <div class="field has-addons mb-0">
      <div class="control is-expanded">
        <input class="input is-success is-small" type="text" name="style" placeholder="Blog post, ect"
          v-model="referenceUrl" :disabled="reference.isSet" />
      </div>
      <div class="control" v-if="!context.isSet">
        <button class="button is-primary is-pulled-right is-small" :class="{ 'is-loading': reference.isLoading }"
          :disabled="!referenceUrl" @click="setReference">
          Set
        </button>
      </div>
      <div class="control" v-if="reference.isSet">
        <button class="button is-primary is-small" @click="showEditor">Edit</button>
      </div>
      <div class="control" v-if="reference.isSet">
        <button class="button is-danger is-small" @click="clearReference">Clear</button>
      </div>
    </div>
    <div v-if="reference.isInvalid">
      <p class="is-size-7 has-text-danger">
        Please enter a valid URL with the protocal (http/https)
      </p>
    </div>
    <p class="is-size-7 mt-1">Use this to reference a style that you would like the model to emulate</p> -->

  </div>
</template>
