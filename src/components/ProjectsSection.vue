<script setup>
import BaseIcon from './BaseIcon.vue'
import FlowDiagram from './FlowDiagram.vue'
import SectionHeading from './SectionHeading.vue'
import SpinningCube from './SpinningCube.vue'
import { projects, smallProjects } from '../data/profile.js'
</script>

<template>
  <section id="projects" class="section" aria-labelledby="projects-title">
    <div class="container">
      <SectionHeading
        id="projects-title"
        index="03 / Selected Projects"
        title="Selected Projects"
        intro="Five software and systems projects from my GitHub, plus smaller technical explorations."
      />

      <div class="projects-list">
        <article
          v-for="(p, idx) in projects"
          :key="p.id"
          class="project"
          :class="{ 'project--lead': idx === 0 }"
          :aria-labelledby="`proj-${p.id}`"
        >
          <div class="project__meta">
            <p class="project__index mono">{{ String(idx + 1).padStart(2, '0') }}</p>
            <p class="label">{{ p.kind }}</p>
            <p v-if="p.status" class="project__status mono">{{ p.status }}</p>
            <div class="project__links">
              <a class="link-arrow" :href="p.repo" target="_blank" rel="noopener">
                Repository <BaseIcon name="arrow" />
              </a>
              <a v-if="p.demo" class="link-arrow" :href="p.demo" target="_blank" rel="noopener">
                Live demo <BaseIcon name="arrow" />
              </a>
            </div>
          </div>

          <div class="project__body">
            <h3 :id="`proj-${p.id}`" class="project__title">{{ p.name }}</h3>
            <p class="project__summary">{{ p.summary }}</p>

            <dl class="project__facts">
              <div>
                <dt class="label">Problem</dt>
                <dd>{{ p.problem }}</dd>
              </div>
              <div>
                <dt class="label">Contribution</dt>
                <dd>{{ p.contribution }}</dd>
              </div>
            </dl>

            <FlowDiagram v-if="p.diagram" class="project__extra" :title="p.diagram.title" :nodes="p.diagram.nodes" />

            <div v-if="p.tests" class="project__extra test-matrix">
              <p class="label test-matrix__title">Test coverage structure</p>
              <div class="test-matrix__grid">
                <div v-for="t in p.tests" :key="t.layer" class="test-matrix__row">
                  <span class="mono test-matrix__layer">{{ t.layer }}</span>
                  <div>
                    <span class="label">Unit:</span> {{ t.unit }}
                  </div>
                  <div>
                    <span class="label">Integration:</span> {{ t.integration }}
                  </div>
                </div>
              </div>
            </div>

            <dl v-if="p.specs" class="project__extra specs">
              <div v-for="s in p.specs" :key="s.k" class="specs__item">
                <dt class="label">{{ s.k }}</dt>
                <dd class="mono">{{ s.v }}</dd>
              </div>
            </dl>

            <div class="project__details">
              <p class="label project__details-label">Implementation notes</p>
              <ul class="project__bullets">
                <li v-for="d in p.details" :key="d">{{ d }}</li>
              </ul>
            </div>

            <ul class="tags" aria-label="Technology stack">
              <li v-for="t in p.stack" :key="t" class="tag">{{ t }}</li>
            </ul>
          </div>
        </article>
      </div>

      <!-- Smaller technical explorations -->
      <div class="explorations">
        <div class="explorations__header">
          <h3 class="explorations__title">Smaller Explorations</h3>
          <p class="label">Focused experiments &amp; browser builds</p>
        </div>

        <div class="explorations__grid">
          <article v-for="sp in smallProjects" :key="sp.name" class="small-card" :class="{ 'small-card--wide': sp.live }">
            <div v-if="sp.live" class="small-card__canvas">
              <SpinningCube />
              <span class="small-card__caption mono">Live canvas · 3×3 rotation matrices</span>
            </div>
            <div class="small-card__content">
              <div class="small-card__top">
                <h4 class="small-card__title">{{ sp.name }}</h4>
                <div class="small-card__links">
                  <a class="link-arrow" :href="sp.repo" target="_blank" rel="noopener">
                    Code <BaseIcon name="arrow" />
                  </a>
                  <a v-if="sp.demo" class="link-arrow" :href="sp.demo" target="_blank" rel="noopener">
                    Live <BaseIcon name="arrow" />
                  </a>
                </div>
              </div>
              <p class="small-card__text">{{ sp.text }}</p>
              <ul class="tags" aria-label="Technologies">
                <li v-for="t in sp.stack" :key="t" class="tag">{{ t }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.project {
  display: grid;
  grid-template-columns: minmax(0, 14rem) minmax(0, 1fr);
  gap: var(--space-6);
  padding-block: var(--space-7);
  border-top: 1px solid var(--line);
}

.project--lead {
  border-top: 2px solid var(--ink);
}

.project__meta {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: var(--space-2);
}

.project__index {
  font-size: var(--step-1);
  font-weight: 500;
  color: var(--ink);
}

.project__status {
  font-size: 0.75rem;
  padding: 0.2rem 0.5rem;
  background: var(--accent-soft);
  color: var(--accent);
  border-radius: var(--radius);
}

.project__links {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-top: var(--space-3);
}

.project__title {
  font-size: var(--step-2);
  margin-bottom: var(--space-2);
}

.project--lead .project__title {
  font-size: var(--step-3);
}

.project__summary {
  font-size: var(--step-1);
  color: var(--ink-2);
  max-width: 44rem;
  margin-bottom: var(--space-5);
}

.project__facts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
  padding: var(--space-4) 0;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  margin-bottom: var(--space-5);
}

.project__facts dt {
  margin-bottom: var(--space-1);
}

.project__facts dd {
  font-size: 0.95rem;
  color: var(--ink-2);
  line-height: 1.5;
}

.project__extra {
  margin-bottom: var(--space-5);
}

/* FinTrack test matrix */
.test-matrix {
  background: var(--bg-sunken);
  border: 1px solid var(--line);
  padding: var(--space-5);
}

.test-matrix__title {
  margin-bottom: var(--space-3);
}

.test-matrix__grid {
  display: grid;
  gap: var(--space-3);
}

.test-matrix__row {
  display: grid;
  grid-template-columns: 7rem 1fr 1fr;
  gap: var(--space-4);
  padding: var(--space-3);
  background: var(--bg-raised);
  border: 1px solid var(--line);
  font-size: 0.9rem;
}

.test-matrix__layer {
  font-weight: 500;
  color: var(--accent);
}

/* Platformer specs */
.specs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-top: 1px solid var(--line);
  border-left: 1px solid var(--line);
}

.specs__item {
  padding: var(--space-4);
  background: var(--bg-raised);
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.specs__item dd {
  margin-top: var(--space-1);
  font-size: 0.95rem;
  font-weight: 500;
}

.project__details {
  margin-bottom: var(--space-5);
}

.project__details-label {
  margin-bottom: var(--space-3);
}

.project__bullets {
  padding-left: 1.1rem;
  display: grid;
  gap: var(--space-2);
  max-width: 46rem;
  color: var(--ink-2);
}

.project__bullets li::marker {
  color: var(--accent);
}

/* Explorations */
.explorations {
  margin-top: var(--space-7);
  padding-top: var(--space-7);
  border-top: 2px solid var(--ink);
}

.explorations__header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
}

.explorations__title {
  font-size: var(--step-2);
}

.explorations__grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: var(--space-5);
}

.small-card {
  border: 1px solid var(--line-strong);
  background: var(--bg-raised);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.small-card--wide {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 13rem 1fr;
  gap: var(--space-6);
  align-items: center;
}

.small-card__canvas {
  background: var(--bg-sunken);
  border: 1px solid var(--line);
  padding: var(--space-3);
  text-align: center;
}

.small-card__caption {
  display: block;
  font-size: 0.7rem;
  color: var(--ink-3);
  margin-top: var(--space-2);
}

.small-card__content {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  height: 100%;
}

.small-card__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: var(--space-3);
}

.small-card__title {
  font-size: var(--step-1);
}

.small-card__links {
  display: flex;
  gap: var(--space-4);
}

.small-card__text {
  color: var(--ink-2);
  font-size: 0.95rem;
  margin-bottom: auto;
}

@media (max-width: 820px) {
  .project {
    grid-template-columns: 1fr;
    gap: var(--space-4);
    padding-block: var(--space-6);
  }
  .project__meta {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-3);
  }
  .project__links {
    margin-top: 0;
    margin-left: auto;
    flex-direction: row;
    gap: var(--space-4);
  }
  .project__facts {
    grid-template-columns: 1fr;
    gap: var(--space-4);
  }
  .test-matrix__row {
    grid-template-columns: 1fr;
    gap: var(--space-1);
  }
  .specs {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  .explorations__grid {
    grid-template-columns: 1fr;
  }
  .small-card--wide {
    grid-template-columns: 1fr;
  }
  .small-card__canvas {
    max-width: 14rem;
  }
}
</style>

