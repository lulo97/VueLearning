<script setup lang="ts">
import { useRouter } from './router'

const { currentComponent } = useRouter()
</script>

<template>
  <component :is="currentComponent" />
</template>
