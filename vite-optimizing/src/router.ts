import { ref, shallowRef } from 'vue'
import Before from './key/Before.vue'

type Route = {
  path: string
  component: any
}

const routes: Route[] = [
   { path: '/before', component: Before },
]

const currentComponent = shallowRef<any>(null)

function resolveRoute() {
  const path = window.location.pathname
  const match = routes.find(r => r.path === path)
  currentComponent.value = match?.component ?? null
}

export function useRouter() {
  return {
    currentComponent
  }
}

export function navigate(path: string) {
  history.pushState({}, '', path)
  resolveRoute()
}

window.addEventListener('popstate', resolveRoute)
resolveRoute()
