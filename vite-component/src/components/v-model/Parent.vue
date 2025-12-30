<template>
    <div class="self">
        Parent see: name = {{ name }}, age = {{ age }} <br />

        <Child v-model:name="name" v-model:age="age" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Child from './Child.vue'

const name = ref('Luong')
const age = ref(20)
</script>