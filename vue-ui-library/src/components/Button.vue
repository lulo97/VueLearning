<template>
  <button @click="emit('click')" :class="[styleNormal, styleHover, styleClicked]">
    <slot /> 
  </button>

</template>

<script setup>
import { computed } from 'vue'

const emit = defineEmits(['click'])

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
})

import { useAttrs } from 'vue'

const attrs = useAttrs()

const TEXT_COLOR_CLASSES = {
  default: 'text-gray-600',
  primary: 'text-white',
  success: 'text-white',
  error: 'text-white',
  warning: 'text-white',
}

const BACKGROUND_CLASSES = {
  default: 'bg-white',
  primary: Object.keys(attrs).includes('disabled') ? 'bg-indigo-300 cursor-not-allowed' : 'bg-indigo-500',
  success: 'bg-green-500',
  error: 'bg-red-500',
  warning: 'bg-yellow-500',
}

const HOVER_CLASSES = {
  default: 'hover:text-gray-900 hover:bg-gray-100',
  primary: 'hover:text-indigo-700 hover:bg-indigo-50',
  success: 'hover:text-green-700 hover:bg-green-50',
  error: 'hover:text-red-700 hover:bg-red-50',
  warning: 'hover:text-yellow-700 hover:bg-yellow-50',
}

const ACTIVE_CLASSES = {
  default: 'active:border-gray-900',
  primary: 'active:border-indigo-700',
  success: 'active:border-green-700',
  error: 'active:border-red-700',
  warning: 'active:border-yellow-700',
}

const styleNormal = computed(() => [
  'px-3 py-1 border border-gray-300 rounded-md font-medium',
  TEXT_COLOR_CLASSES[props.type] ?? TEXT_COLOR_CLASSES.default,
  BACKGROUND_CLASSES[props.type] ?? BACKGROUND_CLASSES.default
])

const styleHover = computed(() => {
  if (Object.keys(attrs).includes('disabled')) return [];
  return [
    'hover:cursor-pointer transition-colors',
    HOVER_CLASSES[props.type] ?? HOVER_CLASSES.default,
  ]
})

const styleClicked = computed(() => {
  if (Object.keys(attrs).includes('disabled')) return [];
  return [
    'transition-colors duration-300 active:scale-95 ',
    ACTIVE_CLASSES[props.type] ?? ACTIVE_CLASSES.default,
  ]
})
</script>
