import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

/* -----------------------------
   1. globalProperties
----------------------------- */
app.config.globalProperties.$appName = 'Config Demo App'
app.config.globalProperties.$log = (...args: any[]) => {
  console.log('[App Log]:', ...args)
}

/* -----------------------------
   2. errorHandler
----------------------------- */
app.config.errorHandler = (err, instance, info) => {
  console.error('Global Error:', err)
  console.error('Component:', instance)
  console.error('Info:', info)
}

/* -----------------------------
   3. warnHandler
----------------------------- */
app.config.warnHandler = (msg, instance, trace) => {
  console.warn('Vue Warning:', msg)
  console.warn('Trace:', trace)
}

/* -----------------------------
   5. performance (dev only)
----------------------------- */
app.config.performance = true

/* -----------------------------
   6. optionMergeStrategies
   (custom option example)
----------------------------- */
app.config.optionMergeStrategies.customOption = (
  parent,
  child
) => {
  return parent ? parent + ',' + child : child
}

app.mount('#app')
