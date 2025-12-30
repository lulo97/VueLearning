<script setup lang="ts">
const props = defineProps<{
  count: number
}>()

const emit = defineEmits<{
  (e: 'emitChange', amount: number): void
}>()
</script>

<template>
  <div class="controls">
    <p>Child sees count: {{ props.count }}</p>

    <!-- @click = Listen to click to fire emit -->
    <button @click="emit('emitChange', +1)">+</button>
    <button @click="emit('emitChange', -1)">−</button>
  </div>
</template>
