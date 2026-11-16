<script setup>
defineProps({
  index: { type: String, required: true },
  title: { type: String, required: true },
  id: { type: String, required: true },
  intro: { type: String, default: '' },
})
</script>

<template>
  <header class="section-heading">
    <span class="section-heading__index mono" aria-hidden="true">{{ index }}</span>
    <h2 :id="id" class="section-heading__title">{{ title }}</h2>
    <p v-if="intro" class="section-heading__intro">{{ intro }}</p>
  </header>
</template>

<style scoped>
.section-heading {
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
  column-gap: var(--space-6);
  row-gap: var(--space-3);
  align-items: baseline;
  margin-bottom: var(--space-7);
}

.section-heading__index {
  font-size: var(--step--1);
  color: var(--accent);
  letter-spacing: 0.04em;
}

.section-heading__title {
  font-size: var(--step-3);
}

.section-heading__intro {
  grid-column: 2;
  max-width: 44rem;
  color: var(--ink-2);
}

@media (max-width: 720px) {
  .section-heading {
    grid-template-columns: 1fr;
    margin-bottom: var(--space-6);
  }
  .section-heading__intro {
    grid-column: 1;
  }
}
</style>

