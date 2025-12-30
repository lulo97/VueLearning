import 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $toast: (message: string, timeout?: number) => void
  }
}
