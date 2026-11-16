<script setup>
defineProps({
  title: { type: String, required: true },
  nodes: { type: Array, required: true },
})
</script>

<template>
  <figure class="flow">
    <figcaption class="label flow__title">{{ title }}</figcaption>
    <ol role="list" class="flow__list">
      <li v-for="(node, i) in nodes" :key="node.label" class="flow__node" :class="{ 'is-external': node.external }">
        <span class="flow__step mono" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <span class="flow__label mono">{{ node.label }}</span>
        <span class="flow__sub">{{ node.sub }}</span>
      </li>
    </ol>
  </figure>
</template>

<style scoped>
.flow {
  background: var(--bg-sunken);
  border: 1px solid var(--line);
  padding: var(--space-5);
}

.flow__title {
  margin-bottom: var(--space-4);
}

.flow__list {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: minmax(0, 1fr);
  gap: 1.75rem;
  margin: 0;
}

.flow__node {
  position: relative;
  display: grid;
  align-content: start;
  gap: 0.35rem;
  padding: var(--space-3);
  background: var(--bg-raised);
  border: 1px solid var(--line-strong);
  min-width: 0;
}

.flow__node.is-external {
  border-style: dashed;
  background: transparent;
}

/* connector arrow */
.flow__node:not(:last-child)::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -1.75rem;
  width: 1.75rem;
  height: 1px;
  background: var(--ink-3);
}

.flow__node:not(:last-child)::before {
  content: '';
  position: absolute;
  top: calc(50% - 4px);
  right: -1.75rem;
  border: 4px solid transparent;
  border-left: 6px solid var(--ink-3);
  border-right: 0;
}

.flow__step {
  font-size: 0.7rem;
  color: var(--accent);
}

.flow__label {
  font-size: 0.82rem;
  font-weight: 500;
  overflow-wrap: anywhere;
}

.flow__sub {
  font-size: 0.8rem;
  line-height: 1.4;
  color: var(--ink-3);
}

@media (max-width: 900px) {
  .flow__list {
    grid-auto-flow: row;
    gap: 1.25rem;
  }
  .flow__node {
    grid-template-columns: 2rem 1fr;
    column-gap: var(--space-2);
  }
  .flow__step {
    grid-row: span 2;
    padding-top: 0.1rem;
  }
  .flow__node:not(:last-child)::after {
    top: auto;
    bottom: -1.25rem;
    right: auto;
    left: 1.5rem;
    width: 1px;
    height: 1.25rem;
  }
  .flow__node:not(:last-child)::before {
    top: auto;
    right: auto;
    bottom: -1.25rem;
    left: calc(1.5rem - 3.5px);
    border: 4px solid transparent;
    border-top: 6px solid var(--ink-3);
    border-bottom: 0;
  }
}
</style>

