<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import BaseIcon from './BaseIcon.vue'
import { profile } from '../data/profile.js'
import { useActiveSection } from '../composables/useActiveSection.js'

const links = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const active = useActiveSection(links.map((l) => l.id))
const open = ref(false)
const scrolled = ref(false)
const toggle = ref(null)

function onScroll() {
  scrolled.value = window.scrollY > 8
}

function onKey(e) {
  if (e.key === 'Escape' && open.value) {
    open.value = false
    toggle.value?.focus()
  }
}

function close() {
  open.value = false
}

watch(open, (v) => {
  document.documentElement.style.overflow = v ? 'hidden' : ''
})

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
  window.matchMedia('(min-width: 861px)').addEventListener('change', (m) => m.matches && close())
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
</script>

<template>
  <header class="site-header" :class="{ 'is-scrolled': scrolled, 'is-open': open }">
    <div class="container site-header__inner">
      <a href="#top" class="site-header__name" @click="close">
        <span class="site-header__mark mono" aria-hidden="true">AG</span>
        <span>Adam Guizaoui</span>
      </a>

      <nav class="site-nav" aria-label="Primary">
        <ul id="site-nav-list" role="list" class="site-nav__list">
          <li v-for="link in links" :key="link.id">
            <a
              :href="`#${link.id}`"
              class="site-nav__link"
              :class="{ 'is-active': active === link.id }"
              :aria-current="active === link.id ? 'location' : undefined"
              @click="close"
              >{{ link.label }}</a
            >
          </li>
          <li class="site-nav__cv-mobile">
            <a class="btn btn--primary" :href="profile.cv.href" :download="profile.cv.filename" @click="close">
              <BaseIcon name="download" /> Download CV
            </a>
          </li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <a class="icon-link" :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub profile">
          <BaseIcon name="github" />
        </a>
        <a
          v-if="profile.linkedin"
          class="icon-link"
          :href="profile.linkedin"
          target="_blank"
          rel="noopener"
          aria-label="LinkedIn profile"
        >
          <BaseIcon name="linkedin" />
        </a>
        <a class="btn site-header__cv" :href="profile.cv.href" :download="profile.cv.filename">
          <BaseIcon name="download" /> CV
        </a>
        <button
          ref="toggle"
          class="site-header__toggle"
          type="button"
          :aria-expanded="open"
          aria-controls="site-nav-list"
          @click="open = !open"
        >
          <BaseIcon :name="open ? 'close' : 'menu'" />
          <span class="visually-hidden">{{ open ? 'Close menu' : 'Open menu' }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--header-h);
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: saturate(1.2) blur(8px);
  -webkit-backdrop-filter: saturate(1.2) blur(8px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--dur) var(--ease);
}

.site-header.is-scrolled {
  border-bottom-color: var(--line);
}

.site-header__inner {
  height: 100%;
  display: flex;
  align-items: center;
  gap: var(--space-5);
}

.site-header__name {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  font-weight: 600;
  text-decoration: none;
  letter-spacing: -0.01em;
  margin-right: auto;
}

.site-header__mark {
  display: inline-grid;
  place-items: center;
  width: 1.9rem;
  height: 1.9rem;
  font-size: 0.75rem;
  font-weight: 500;
  background: var(--ink);
  color: var(--bg);
  border-bottom: 3px solid var(--accent);
}

.site-nav__list {
  display: flex;
  gap: var(--space-1);
  margin: 0;
}

.site-nav__link {
  position: relative;
  display: block;
  padding: 0.5rem 0.7rem;
  font-size: 0.92rem;
  color: var(--ink-2);
  text-decoration: none;
  transition: color var(--dur) var(--ease);
}

.site-nav__link::after {
  content: '';
  position: absolute;
  left: 0.7rem;
  right: 0.7rem;
  bottom: 0.25rem;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--dur) var(--ease);
}

.site-nav__link:hover,
.site-nav__link.is-active {
  color: var(--ink);
}

.site-nav__link:hover::after,
.site-nav__link.is-active::after {
  transform: scaleX(1);
}

.site-nav__link.is-active::after {
  background: var(--accent);
}

.site-nav__cv-mobile {
  display: none;
}

.site-header__actions {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.icon-link {
  display: inline-grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  color: var(--ink-2);
  transition: color var(--dur) var(--ease);
}

.icon-link:hover {
  color: var(--accent);
}

.icon-link svg {
  width: 1.2rem;
  height: 1.2rem;
}

.site-header__cv {
  min-height: 2.25rem;
  padding: 0 0.85rem;
  font-size: 0.88rem;
}

.site-header__toggle {
  display: none;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid var(--line-strong);
  border-radius: var(--radius);
  background: transparent;
  cursor: pointer;
}

.site-header__toggle svg {
  width: 1.25rem;
  height: 1.25rem;
}

@media (max-width: 860px) {
  .site-header__toggle {
    display: inline-grid;
  }
  .site-header__cv {
    display: none;
  }
  .site-nav__list {
    position: fixed;
    inset: var(--header-h) 0 0 0;
    flex-direction: column;
    gap: 0;
    padding: var(--space-5) var(--gutter);
    background: var(--bg);
    border-top: 1px solid var(--line);
    visibility: hidden;
    opacity: 0;
    transform: translateY(-6px);
    transition:
      opacity var(--dur) var(--ease),
      transform var(--dur) var(--ease),
      visibility 0s linear var(--dur);
  }
  .is-open .site-nav__list {
    visibility: visible;
    opacity: 1;
    transform: none;
    transition:
      opacity var(--dur) var(--ease),
      transform var(--dur) var(--ease);
  }
  .site-nav__link {
    padding: 1rem 0;
    font-size: var(--step-1);
    color: var(--ink);
    border-bottom: 1px solid var(--line);
  }
  .site-nav__link::after {
    display: none;
  }
  .site-nav__link.is-active {
    color: var(--accent);
  }
  .site-nav__cv-mobile {
    display: block;
    margin-top: var(--space-6);
  }
}
</style>

