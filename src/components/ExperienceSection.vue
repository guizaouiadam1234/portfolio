<script setup>
import SectionHeading from './SectionHeading.vue'
import { experience } from '../data/profile.js'

const featured = experience.find((e) => e.featured)
const others = experience.filter((e) => !e.featured)
const pct = (v) => `${(v / featured.pipeline.before) * 100}%`
</script>

<template>
  <section id="experience" class="section" aria-labelledby="experience-title">
    <div class="container">
      <SectionHeading
        id="experience-title"
        index="02 / Experience"
        title="Experience"
        intro="Two years of QA automation at a software company, plus internships in full-stack development and internal tooling."
      />

      <!-- Featured: Wiiisdom -->
      <article class="job job--featured" aria-labelledby="job-wiiisdom">
        <div class="job__meta">
          <p class="job__period mono">{{ featured.period }}</p>
          <p class="label">{{ featured.location }}</p>
          <p class="job__current mono"><span aria-hidden="true"></span>Current role</p>
        </div>

        <div class="job__body">
          <h3 id="job-wiiisdom" class="job__title">
            {{ featured.role }} <span class="job__at">at</span> {{ featured.company }}
          </h3>
          <p class="job__summary">{{ featured.summary }}</p>

          <ul role="list" class="highlights">
            <li v-for="h in featured.highlights" :key="h.title" class="highlight">
              <p class="highlight__metric mono">{{ h.metric }}</p>
              <h4 class="highlight__title">{{ h.title }}</h4>
              <p class="highlight__text">{{ h.text }}</p>
            </li>
          </ul>

          <figure
            class="pipeline"
            role="img"
            :aria-label="`Test pipeline duration reduced from ${featured.pipeline.before} to ${featured.pipeline.after} minutes`"
          >
            <figcaption class="label">E2E pipeline duration</figcaption>
            <div class="pipeline__row">
              <span class="pipeline__name mono">Before</span>
              <span class="pipeline__track"><span class="pipeline__bar pipeline__bar--before" :style="{ width: pct(featured.pipeline.before) }"></span></span>
              <span class="pipeline__val mono">{{ featured.pipeline.before }} min</span>
            </div>
            <div class="pipeline__row">
              <span class="pipeline__name mono">With parallel engine</span>
              <span class="pipeline__track"><span class="pipeline__bar pipeline__bar--after" :style="{ width: pct(featured.pipeline.after) }"></span></span>
              <span class="pipeline__val mono">{{ featured.pipeline.after }} min</span>
            </div>
          </figure>

          <ul class="tags" aria-label="Technologies">
            <li v-for="t in featured.stack" :key="t" class="tag">{{ t }}</li>
          </ul>
        </div>
      </article>

      <!-- Other roles -->
      <article v-for="job in others" :key="job.id" class="job" :aria-labelledby="`job-${job.id}`">
        <div class="job__meta">
          <p class="job__period mono">{{ job.period }}</p>
          <p class="label">{{ job.location }}</p>
        </div>
        <div class="job__body">
          <h3 :id="`job-${job.id}`" class="job__title">
            {{ job.role }} <span class="job__at">at</span> {{ job.company }}
          </h3>
          <p class="job__summary">{{ job.summary }}</p>
          <ul class="job__bullets">
            <li v-for="b in job.bullets" :key="b">{{ b }}</li>
          </ul>
          <ul class="tags" aria-label="Technologies">
            <li v-for="t in job.stack" :key="t" class="tag">{{ t }}</li>
          </ul>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.job {
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
  gap: var(--space-6);
  padding-block: var(--space-7);
  border-top: 1px solid var(--line);
}

.job--featured {
  border-top: 2px solid var(--ink);
  padding-top: var(--space-6);
}

.job__meta {
  display: grid;
  align-content: start;
  gap: var(--space-1);
}

.job__period {
  font-size: 0.92rem;
  font-weight: 500;
}

.job__current {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: var(--space-3);
  font-size: var(--step--1);
  color: var(--ok);
}

.job__current span {
  width: 0.5rem;
  height: 0.5rem;
  background: var(--ok);
  border-radius: 50%;
}

.job__title {
  font-size: var(--step-2);
  margin-bottom: var(--space-3);
}

.job--featured .job__title {
  font-size: var(--step-3);
}

.job__at {
  font-weight: 400;
  color: var(--ink-3);
}

.job__summary {
  color: var(--ink-2);
  max-width: 44rem;
  margin-bottom: var(--space-5);
}

.job__bullets {
  padding-left: 1.1rem;
  margin-bottom: var(--space-5);
  display: grid;
  gap: var(--space-2);
  max-width: 44rem;
}

.job__bullets li::marker {
  color: var(--accent);
}

/* Highlights grid */
.highlights {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
  margin-bottom: var(--space-6);
}

.highlight {
  padding: var(--space-5);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: var(--bg-raised);
  transition: background-color var(--dur) var(--ease);
}

.highlight:hover {
  background: var(--bg);
}

.highlight__metric {
  font-size: var(--step-2);
  font-weight: 500;
  color: var(--accent);
  line-height: 1;
  margin-bottom: var(--space-4);
  letter-spacing: -0.02em;
}

.highlight__title {
  font-size: var(--step-0);
  margin-bottom: var(--space-2);
}

.highlight__text {
  font-size: 0.95rem;
  color: var(--ink-2);
  line-height: 1.55;
}

/* Pipeline chart */
.pipeline {
  display: grid;
  gap: var(--space-3);
  margin-bottom: var(--space-6);
  max-width: 44rem;
}

.pipeline figcaption {
  margin-bottom: var(--space-1);
}

.pipeline__row {
  display: grid;
  grid-template-columns: 10.5rem 1fr 4rem;
  align-items: center;
  gap: var(--space-4);
}

.pipeline__name,
.pipeline__val {
  font-size: 0.82rem;
  color: var(--ink-2);
}

.pipeline__val {
  text-align: right;
  color: var(--ink);
}

.pipeline__track {
  height: 0.9rem;
  background: var(--bg-sunken);
  position: relative;
}

.pipeline__bar {
  position: absolute;
  inset: 0 auto 0 0;
}

.pipeline__bar--before {
  background: repeating-linear-gradient(
    -45deg,
    var(--line-strong) 0 4px,
    transparent 4px 8px
  );
}

.pipeline__bar--after {
  background: var(--accent);
}

@media (max-width: 720px) {
  .job {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding-block: var(--space-6);
  }
  .job__meta {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2) var(--space-4);
    align-items: baseline;
  }
  .job__current {
    margin-top: 0;
  }
  .highlights {
    grid-template-columns: 1fr;
  }
  .pipeline__row {
    grid-template-columns: 6.5rem 1fr 3.5rem;
    gap: var(--space-3);
  }
}
</style>
