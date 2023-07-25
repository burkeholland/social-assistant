<script setup>
import Download from '@/components/Download.vue'
import Source from '@/components/Source.vue'
import SourceHistory from '@/components/SourceHistory.vue'
</script>

<template>
  <section class="is-fullheight">
    <p class="mt-3">
      Step 1: Add a source to ground the model. You can copy paste any text into the box, or
      automatically download blog posts, docs, articles and YouTube transcripts.
    </p>
    <div class="mt-5">
      <div class="columns">
        <div id="history" class="column is-two-fifths">
          <Download />
          <SourceHistory />
        </div>
        <div class="column is-three-fifths">
          <Source id="source" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* the history column should have a thin grey border on the right-hand side */
#history {
  border-right: 1px solid #ddd;
}

/* the source element should take up the full height of the page minus the height of the navbar */
#source {
  height: 100%;
}
</style>
