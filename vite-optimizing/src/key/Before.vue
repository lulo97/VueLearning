<template>
    <ul>
        <li v-for="item in items">

            {{ item.name }}
        </li>
    </ul>
</template>

<script setup>
import { ref, nextTick } from 'vue'

const items = ref(
    Array.from({ length: 5000 }, (_, i) => ({
        id: i,
        name: `Item ${i}`,
        selected: false
    }))
)

async function reverseList() {
    console.time('update')
    items.value = [...items.value].reverse()
    await nextTick()
    console.timeEnd('update')
}

reverseList()
</script>
