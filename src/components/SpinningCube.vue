<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

/*
 * Port of the projection code from github.com/guizaouiadam1234/SpinningAlj:
 * per-axis 3×3 rotation matrices applied in X -> Y -> Z order, then a simple
 * perspective divide. Pauses off-screen; static frame under reduced motion.
 */

const canvas = ref(null)
let raf = 0
let observer
let visible = false
let angle = 0.6
let colors = null

const vertices = [
  [-1, -1, -1], [1, -1, -1], [1, 1, -1], [-1, 1, -1],
  [-1, -1, 1], [1, -1, 1], [1, 1, 1], [-1, 1, 1],
]
const edges = [
  [0, 1], [1, 2], [2, 3], [3, 0],
  [4, 5], [5, 6], [6, 7], [7, 4],
  [0, 4], [1, 5], [2, 6], [3, 7],
]

const mul = (m, v) => [
  m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
  m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
  m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
]
const rotX = (a) => [[1, 0, 0], [0, Math.cos(a), -Math.sin(a)], [0, Math.sin(a), Math.cos(a)]]
const rotY = (a) => [[Math.cos(a), 0, Math.sin(a)], [0, 1, 0], [-Math.sin(a), 0, Math.cos(a)]]
const rotZ = (a) => [[Math.cos(a), -Math.sin(a), 0], [Math.sin(a), Math.cos(a), 0], [0, 0, 1]]

function draw() {
  const el = canvas.value
  if (!el) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const size = el.clientWidth
  if (el.width !== size * dpr) {
    el.width = size * dpr
    el.height = size * dpr
  }
  const ctx = el.getContext('2d')
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  ctx.clearRect(0, 0, size, size)

  if (!colors) {
    const styles = getComputedStyle(el)
    colors = {
      ink: styles.getPropertyValue('--ink').trim() || '#161614',
      accent: styles.getPropertyValue('--accent').trim() || '#c8441a',
    }
  }
  const { ink, accent } = colors

  const distance = 5
  const scale = size * 0.21
  const mx = rotX(angle), my = rotY(angle), mz = rotZ(angle)
  const projected = vertices.map((v) => {
    const r = mul(mz, mul(my, mul(mx, v)))
    const z = r[2] + distance
    return [((r[0] * distance) / z) * scale + size / 2, ((r[1] * distance) / z) * scale + size / 2]
  })

  ctx.lineWidth = 1
  ctx.strokeStyle = ink
  for (const [a, b] of edges) {
    ctx.beginPath()
    ctx.moveTo(projected[a][0], projected[a][1])
    ctx.lineTo(projected[b][0], projected[b][1])
    ctx.stroke()
  }
  ctx.fillStyle = accent
  for (const [x, y] of projected) {
    ctx.fillRect(x - 2, y - 2, 4, 4)
  }
}

function resetColors() {
  colors = null
  draw()
}

function loop() {
  angle += 0.01
  draw()
  raf = requestAnimationFrame(loop)
}

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

onMounted(() => {
  draw()
  observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    cancelAnimationFrame(raf)
    if (visible && !reduced()) raf = requestAnimationFrame(loop)
  })
  observer.observe(canvas.value)
  window.addEventListener('resize', draw, { passive: true })
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', resetColors)
})

onBeforeUnmount(() => {
  cancelAnimationFrame(raf)
  observer?.disconnect()
  window.removeEventListener('resize', draw)
  window.matchMedia('(prefers-color-scheme: dark)').removeEventListener('change', resetColors)
})
</script>

<template>
  <canvas
    ref="canvas"
    class="cube"
    role="img"
    aria-label="Wireframe cube rotating, rendered with rotation matrices and perspective projection"
  ></canvas>
</template>

<style scoped>
.cube {
  width: 100%;
  aspect-ratio: 1;
}
</style>
