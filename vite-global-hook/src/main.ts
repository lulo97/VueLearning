import { createApp } from 'vue'
import App from './App.vue'
import { showToast } from './toast'

const app = createApp(App)

app.config.globalProperties.$toast = showToast

app.mount('#app')
