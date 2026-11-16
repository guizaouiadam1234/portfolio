<script setup>
import SectionHeading from './SectionHeading.vue'
import { skills } from '../data/profile.js'
</script>

<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="container">
      <SectionHeading
        id="skills-title"
        index="04 / Technical Skills"
        title="Technical Skills"
        intro="Grouped by domain, with the roles or repositories where each set of tools is used."
      />

      <div class="skills-table" role="list">
        <div v-for="group in skills" :key="group.group" class="skills-row" role="listitem">
          <div class="skills-row__head">
            <h3 class="skills-row__title">{{ group.group }}</h3>
            <p class="label">{{ group.where }}</p>
          </div>
          <ul class="tags skills-row__tags" :aria-label="group.group">
            <li v-for="item in group.items" :key="item" class="tag">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.skills-table {
  border-top: 2px solid var(--ink);
}

.skills-row {
  display: grid;
  grid-template-columns: minmax(0, 18rem) minmax(0, 1fr);
  gap: var(--space-6);
  padding-block: var(--space-5);
  border-bottom: 1px solid var(--line);
  align-items: baseline;
}

.skills-row__title {
  font-size: var(--step-0);
  margin-bottom: var(--space-1);
}

.skills-row__tags {
  align-self: center;
}

@media (max-width: 720px) {
  .skills-row {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
}
</style>

