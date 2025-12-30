<script setup lang="ts">
import Child from './Child.vue';

</script>

<template>
    <div class="self">
        <Child>
            <div>This is content from parent passed to child and render by v-slot</div>
        </Child>

    </div>
</template>