<template>
  <div>
    <h4>Buttons with type:</h4>
    <Button @click="handleClick">Click me</Button>
    <Button type="primary" @click="handleClick">Click me</Button>
    <Button type="success" @click="handleClick">Click me</Button>
    <Button type="error" @click="handleClick">Click me</Button>
    <Button type="warning" @click="handleClick">Click me</Button>

  </div>

  <br />

  <div>
    <h4>Button with "disabled" attribute</h4>
    <Button type="primary" disabled @click="handleClick">Click me</Button>

  </div>

  <br />

  <div>
    <h4>Popup</h4>

    <Popup v-model:open="isOpen">
      <template #trigger>
        <Button @click="handleTogglePopup">
          Open popup
        </Button>
      </template>

      <template #content>
        <h2 class="text-lg font-semibold mb-2">Popup content</h2>
        <p>This is inside the popup.</p>

        <div class="mt-4 text-right">
          <button class="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300" @click="handleTogglePopup">
            Close
          </button>
        </div>
      </template>
    </Popup>


  </div>

</template>

<script setup>
import { ref } from 'vue';
import Button from './components/Button.vue'
import Popup from './components/Popup.vue';

function handleClick() {
  console.log('123')
}

function handleTogglePopup() {
  isOpen.value = !isOpen.value
}

const isOpen = ref(false)

</script>
