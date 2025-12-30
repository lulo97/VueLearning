<template>
  <h1>{{ $appName }}</h1>

  <Hello />

  <!-- Custom element allowed by compilerOptions -->
  <my-web-component></my-web-component>

  <!-- This component will throw -->
  <Broken />
</template>

<script setup lang="ts">
import Hello from './components/Hello.vue'
import Broken from './components/Broken.vue'
</script>
