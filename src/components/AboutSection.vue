<script setup>
import SectionHeading from './SectionHeading.vue'
import { about } from '../data/profile.js'
</script>

<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container">
      <SectionHeading id="about-title" index="01 / About" title="Background" />
      <div class="about">
        <p v-for="(p, i) in about.paragraphs" :key="i" :class="{ 'about__first': i === 0 }">{{ p }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.about {
  margin-left: calc(14rem + var(--space-6));
  max-width: 44rem;
  display: grid;
  gap: var(--space-4);
  color: var(--ink-2);
}

.about__first {
  font-size: var(--step-1);
  color: var(--ink);
  line-height: 1.45;
}

@media (max-width: 720px) {
  .about {
    margin-left: 0;
  }
}
</style>

