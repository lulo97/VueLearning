<template>
  <input
    :value="props.name"
    @input="emit('update:name', ($event.target as HTMLInputElement).value)"
  />

  <input
    :value="props.age"
    @input="emit('update:age', Number(($event.target as HTMLInputElement).value))"
  />

  Child see: name = {{ props.name }}, age = {{ props.age }} <br />
</template>

<script setup lang="ts">
const props = defineProps<{
  name: string
  age: number
}>()

const emit = defineEmits<{
  (e: 'update:name', value: string): void
  (e: 'update:age', value: number): void
}>()
</script>
