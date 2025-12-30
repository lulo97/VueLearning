<template>
  <div class="toast-container">
    <div
      v-for="toast in toastStore.messages"
      :key="toast.id"
      class="toast"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup>
import { toastStore } from './toast'
</script>

<style>
.toast-container {
  position: fixed;
  right: 16px;
  bottom: 16px;
}

.toast {
  background: black;
  color: white;
  padding: 8px 12px;
  margin-top: 8px;
}
</style>
