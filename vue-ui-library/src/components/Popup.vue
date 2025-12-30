<template>
  <!-- Trigger -->
  <div @click="openPopup">
    <slot name="trigger" />
  </div>

  <!-- Popup -->

  <!--Teleport to body = Move this div to child of <body></body> to seperate it from deeply nested app div, to avoid css error in the future
  
  Usecase: Model, Popup, Toast, ...
  -->
  <Teleport to="body">
    <!-- Overlay -->
    <!-- Transition = build-in component with attribute for animation when component enter or leave dom -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click.self="closePopup"
      >
        <!-- Popup content -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 scale-95 translate-y-2"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 translate-y-2"
        >
          <div v-if="isOpen" class="bg-white rounded-lg shadow-lg p-6">
            <slot name="content" />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  open?: boolean;
}>();

const emit = defineEmits<{
  (e: "update:open", value: boolean): void;
}>();

/*
VueJS convention forv v-model is child have emit event name "update:my_model_name"
Putting get/set inside computed to make it becode a ref
computed() only run when state changed
*/
const isOpen = computed({
  get: () => props.open ?? false,
  set: (value) => emit("update:open", value),
});

function openPopup() {
  isOpen.value = true;
}

function closePopup() {
  isOpen.value = false;
}
</script>
