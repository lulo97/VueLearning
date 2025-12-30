<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'

const count = ref(0)

function changeCount(amount: number) {
  count.value += amount
}
</script>

<template>
  <div class="self">
    <h2>Parent count: {{ count }}</h2>

    <Child
      :count="count"
      @emitChange="changeCount"
    />
  </div>
</template>