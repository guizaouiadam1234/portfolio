import { onBeforeUnmount, onMounted, ref } from 'vue'

/**
 * Tracks which page section is currently being read, for nav highlighting.
 * A section counts as active once its top passes ~35% of the viewport.
 */
export function useActiveSection(ids) {
  const active = ref('')
  let observer

  onMounted(() => {
    const visible = new Map()
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) visible.set(entry.target.id, entry.isIntersecting)
        active.value = ids.find((id) => visible.get(id)) ?? ''
      },
      { rootMargin: '-35% 0px -60% 0px', threshold: 0 },
    )
    for (const id of ids) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return active
}

