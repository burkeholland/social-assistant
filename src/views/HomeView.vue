<script setup>
import Download from '@/components/Download.vue'
import Source from '@/components/Source.vue'
import SourceHistory from '@/components/SourceHistory.vue'
import Error from '@/components/Error.vue'
</script>

<template>
  <div class="is-fullheight">
    <section class="section">
      Step 1: Add a source to ground the model. You can copy paste any text into the box, or
      automatically download blog posts, docs, articles and YouTube transcripts.
    </section>
    <div class="mt-5">
      <div class="columns">
        <div id="history" class="column is-one-third">
          <SourceHistory />
        </div>
        <div class="column is-two-thirds is-fullheight">
          <Download />
          <Source id="source" />
        </div>
      </div>
    </div>
  </div>
  <Error></Error>
</template>

<style scoped>
/* the history column should have a thin grey border on the right-hand side */
#history {
  border-right: 1px solid #ddd;
}

.columns {
  display: flex;
  flex-direction: row;
}

.column {
  flex-grow: 1;
}

#source {
  height: 100%;
}
</style>
