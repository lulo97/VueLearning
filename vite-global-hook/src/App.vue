<script setup lang="ts">
import Example from './Example.vue';
import Toast from './Toast.vue'
</script>

<template>
  <button @click="$toast('Hello from App')">
    Show Toast
  </button>

  <Example />

  <Toast />
</template>