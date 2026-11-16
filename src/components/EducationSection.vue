<script setup>
import SectionHeading from './SectionHeading.vue'
import { education, languages } from '../data/profile.js'
</script>

<template>
  <section id="education" class="section" aria-labelledby="education-title">
    <div class="container">
      <SectionHeading id="education-title" index="05 / Education" title="Education & Languages" />

      <div class="edu-list">
        <article v-for="item in education" :key="item.school" class="edu">
          <div class="edu__meta">
            <p class="mono edu__period">{{ item.period }}</p>
            <p class="label">{{ item.location }}</p>
          </div>
          <div class="edu__body">
            <h3 class="edu__school">{{ item.school }}</h3>
            <p class="edu__degree">{{ item.degree }}</p>
            <p class="edu__detail">{{ item.detail }}</p>
          </div>
        </article>
      </div>

      <div class="lang-block">
        <p class="label lang-block__label">Spoken languages</p>
        <dl class="lang-grid">
          <div v-for="l in languages" :key="l.name" class="lang-item">
            <dt>{{ l.name }}</dt>
            <dd class="mono">{{ l.level }}</dd>
          </div>
        </dl>
      </div>
    </div>
  </section>
</template>

<style scoped>
.edu-list {
  border-top: 2px solid var(--ink);
}

.edu {
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
  gap: var(--space-6);
  padding-block: var(--space-6);
  border-bottom: 1px solid var(--line);
}

.edu__period {
  font-size: 0.92rem;
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.edu__school {
  font-size: var(--step-2);
  margin-bottom: var(--space-1);
}

.edu__degree {
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.edu__detail {
  color: var(--ink-2);
}

.lang-block {
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
  gap: var(--space-6);
  padding-top: var(--space-6);
  align-items: baseline;
}

.lang-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.lang-item {
  padding: var(--space-4);
  background: var(--bg-raised);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.lang-item dt {
  font-weight: 500;
  margin-bottom: var(--space-1);
}

.lang-item dd {
  font-size: var(--step--1);
  color: var(--ink-2);
}

@media (max-width: 720px) {
  .edu,
  .lang-block {
    grid-template-columns: 1fr;
    gap: var(--space-3);
  }
  .lang-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

