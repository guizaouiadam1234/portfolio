<script setup>
import { ref } from 'vue'
import BaseIcon from './BaseIcon.vue'
import SectionHeading from './SectionHeading.vue'
import { profile } from '../data/profile.js'

const copied = ref(false)
let timer

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(profile.email)
    copied.value = true
    clearTimeout(timer)
    timer = setTimeout(() => {
      copied.value = false
    }, 2200)
  } catch {
    window.location.href = `mailto:${profile.email}`
  }
}
</script>

<template>
  <section id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="container">
      <SectionHeading
        id="contact-title"
        index="06 / Contact"
        title="Get in Touch"
        intro="Open to software engineering, QA automation and cloud / full-stack opportunities. Email is the fastest way to reach me."
      />

      <div class="contact__body">
        <div class="contact__email-row">
          <a class="contact__email mono" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
          <button type="button" class="btn" @click="copyEmail">
            <BaseIcon :name="copied ? 'check' : 'copy'" />
            <span>{{ copied ? 'Copied' : 'Copy email' }}</span>
          </button>
        </div>

        <div class="contact__actions">
          <a class="btn btn--primary" :href="profile.cv.href" :download="profile.cv.filename">
            <BaseIcon name="download" /> Download CV (PDF)
          </a>
          <a class="btn" :href="profile.github" target="_blank" rel="noopener">
            <BaseIcon name="github" /> github.com/{{ profile.githubHandle }}
          </a>
          <a v-if="profile.linkedin" class="btn" :href="profile.linkedin" target="_blank" rel="noopener">
            <BaseIcon name="linkedin" /> LinkedIn
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.contact__body {
  margin-left: calc(14rem + var(--space-6));
  border-top: 2px solid var(--ink);
  padding-top: var(--space-6);
  display: grid;
  gap: var(--space-5);
}

.contact__email-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: var(--space-4);
}

.contact__email {
  font-size: var(--step-2);
  font-weight: 500;
  text-decoration: none;
  border-bottom: 2px solid var(--accent);
  padding-bottom: 2px;
  word-break: break-all;
}

.contact__email:hover {
  color: var(--accent);
}

.contact__actions {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.footer {
  margin-top: var(--space-9);
  padding-top: var(--space-5);
  border-top: 1px solid var(--line);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--space-3);
}

@media (max-width: 720px) {
  .contact__body {
    margin-left: 0;
  }
}
</style>
