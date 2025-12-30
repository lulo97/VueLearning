import 'vue'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $appName: string
    $log: (...args: any[]) => void
  }
}
