<script setup>
import BaseIcon from './BaseIcon.vue'
import { hero, profile } from '../data/profile.js'
</script>

<template>
  <section id="top" class="hero" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero__grid">
        <div class="hero__main">
          <p class="hero__eyebrow mono">{{ hero.eyebrow }}</p>
          <h1 id="hero-title" class="hero__title">Adam<br />Guizaoui</h1>
          <p class="hero__lede">{{ hero.lede }}</p>

          <div class="hero__actions">
            <a class="btn btn--primary" :href="profile.cv.href" :download="profile.cv.filename">
              <BaseIcon name="download" /> Download CV
            </a>
            <a class="btn" :href="`mailto:${profile.email}`"> <BaseIcon name="mail" /> Contact </a>
            <a class="btn" :href="profile.github" target="_blank" rel="noopener">
              <BaseIcon name="github" /> GitHub
            </a>
            <a v-if="profile.linkedin" class="btn" :href="profile.linkedin" target="_blank" rel="noopener">
              <BaseIcon name="linkedin" /> LinkedIn
            </a>
          </div>
        </div>

        <aside class="hero__glance" aria-label="Profile at a glance">
          <p class="label hero__glance-title">At a glance</p>
          <dl class="glance">
            <div v-for="row in hero.glance" :key="row.label" class="glance__row">
              <dt class="label">{{ row.label }}</dt>
              <dd>{{ row.value }}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <ul role="list" class="metrics" aria-label="Key figures">
        <li v-for="m in hero.metrics" :key="m.label" class="metric">
          <p class="metric__value mono">
            {{ m.value }}<span v-if="m.unit" class="metric__unit">{{ m.unit }}</span>
          </p>
          <p class="metric__label">{{ m.label }}</p>
          <p class="metric__detail label">{{ m.detail }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.hero {
  padding-top: clamp(3rem, 8vw, 6.5rem);
  padding-bottom: var(--space-8);
}

.hero__grid {
  display: grid;
  grid-template-columns: minmax(0, 1.55fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 5rem);
  align-items: end;
}

.hero__eyebrow {
  font-size: var(--step--1);
  color: var(--ink-2);
  margin-bottom: var(--space-5);
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.hero__eyebrow::before {
  content: '';
  width: 1.5rem;
  height: 2px;
  background: var(--accent);
}

.hero__title {
  font-size: var(--step-4);
  font-weight: 600;
  line-height: 0.95;
  letter-spacing: -0.035em;
  margin-bottom: var(--space-6);
}

.hero__lede {
  font-size: var(--step-1);
  line-height: 1.5;
  color: var(--ink-2);
  max-width: 38rem;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
  margin-top: var(--space-6);
}

.hero__glance {
  border-top: 2px solid var(--ink);
  padding-top: var(--space-4);
}

.hero__glance-title {
  margin-bottom: var(--space-3);
  color: var(--ink);
}

.glance__row {
  display: grid;
  grid-template-columns: 7.5rem 1fr;
  gap: var(--space-4);
  padding-block: 0.8rem;
  border-bottom: 1px solid var(--line);
}

.glance__row dt {
  padding-top: 0.15rem;
}

.glance__row dd {
  font-size: 0.95rem;
  line-height: 1.45;
}

/* Metrics band */
.metrics {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  margin: var(--space-8) 0 0;
  border-top: 1px solid var(--line-strong);
}

.metric {
  padding: var(--space-5) var(--space-5) 0 0;
  position: relative;
}

.metric + .metric {
  padding-left: var(--space-5);
  border-left: 1px solid var(--line);
}

.metric::before {
  content: '';
  position: absolute;
  top: -1px;
  left: 0;
  width: 2.5rem;
  height: 2px;
  background: var(--accent);
}

.metric + .metric::before {
  left: var(--space-5);
}

.metric__value {
  font-size: var(--step-3);
  font-weight: 500;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: var(--space-3);
}

.metric__unit {
  font-size: 0.45em;
  margin-left: 0.3em;
  letter-spacing: 0;
  color: var(--ink-3);
}

.metric__label {
  font-size: 0.95rem;
  line-height: 1.4;
  color: var(--ink-2);
  max-width: 18rem;
}

.metric__detail {
  margin-top: var(--space-2);
}

@media (max-width: 960px) {
  .hero__grid {
    grid-template-columns: 1fr;
    align-items: start;
  }
}

@media (max-width: 720px) {
  .metrics {
    grid-template-columns: 1fr;
  }
  .metric,
  .metric + .metric {
    padding: var(--space-5) 0;
    border-left: 0;
    border-bottom: 1px solid var(--line);
  }
  .metric + .metric::before {
    left: 0;
  }
  .metric::before {
    top: -1px;
  }
  .glance__row {
    grid-template-columns: 6.5rem 1fr;
  }
  .hero__actions .btn {
    flex: 1 1 auto;
    justify-content: center;
  }
}
</style>

