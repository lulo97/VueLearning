<script setup lang="ts">
import BuildInDirectives from './components/build-in-directives/Example.vue';
import ParentPropsEmit from './components/props-emit/Parent.vue'
import ParentLocalComponent from './components/registration/ParentLocalComponent.vue';
import ParentVModel from './components/v-model/Parent.vue';
import ParentVSlot from './components/v-slot/Parent.vue';

</script>

<template>
  <div class="hello-world">
    Hello World
  </div>
  <GlobalComponent></GlobalComponent> <br />
  <ParentLocalComponent></ParentLocalComponent>
  <ParentPropsEmit></ParentPropsEmit>
  <ParentVModel></ParentVModel>
  <BuildInDirectives></BuildInDirectives>
  <ParentVSlot></ParentVSlot>
</template>

<style scoped>
.hello-world {
  background: wheat;
}
</style>