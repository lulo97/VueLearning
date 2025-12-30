<script setup lang="ts">
import { ref, computed } from 'vue'

// Reactive state
const count = ref<number>(0)
const unrelated = ref<string>('hello')

// Computed property
const doubled = computed(() => {
  console.log('👉 computed: doubled re-computed')
  return count.value * 2
})

// Methods to mutate state
function incrementCount() {
  count.value++
}

function changeUnrelated() {
  unrelated.value += '!'
}
</script>

<template>
  <div>
    <p>count: {{ count }}</p>
    <p>doubled (computed): {{ doubled }}</p>
    <p>unrelated: {{ unrelated }}</p>

    <button @click="incrementCount">Increment count</button>
    <button @click="changeUnrelated">Change unrelated</button>
  </div>
</template>
