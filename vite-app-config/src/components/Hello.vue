<template>
  <button @click="sayHello">Click me</button>
</template>

<script setup lang="ts">
import { getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()!

function sayHello() {
  proxy!.$log('Hello from Hello.vue')
}
</script>
