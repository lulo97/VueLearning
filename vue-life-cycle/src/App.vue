<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onActivated,
  onDeactivated,
  onServerPrefetch
} from 'vue'

/* reactive state */
const count = ref(0)
const el = ref<HTMLElement | null>(null)

/* ---------- basic lifecycle ---------- */

onBeforeMount(() => {
  console.log('onBeforeMount')
})

onMounted(() => {
  console.log('onMounted')
  console.log('DOM element:', el.value)
})

onBeforeUpdate(() => {
  console.log('onBeforeUpdate')
})

onUpdated(() => {
  console.log('onUpdated - count is now:', count.value)
})

onBeforeUnmount(() => {
  console.log('onBeforeUnmount')
})

onUnmounted(() => {
  console.log('onUnmounted')
})

/* ---------- error handling ---------- */

onErrorCaptured((err, instance, info) => {
  console.error('onErrorCaptured:', err, info)
  return false // stop propagation (optional)
})

/* ---------- debug hooks (dev only) ---------- */

onRenderTracked((e) => {
  console.log('onRenderTracked:', e)
})

onRenderTriggered((e) => {
  console.log('onRenderTriggered:', e)
})

/* ---------- keep-alive hooks ---------- */

onActivated(() => {
  console.log('onActivated (KeepAlive)')
})

onDeactivated(() => {
  console.log('onDeactivated (KeepAlive)')
})

/* ---------- SSR hook ---------- */

onServerPrefetch(async () => {
  console.log('onServerPrefetch (SSR only)')
})
</script>

<template>
  <div>
    <h2 ref="el">Lifecycle Demo</h2>

    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
  </div>
</template>
