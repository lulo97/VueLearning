<template>
    <div class="self">
        <p v-text="'This is v-text by <p>'"></p>

        <div v-html="'<div style=\'background:red;\'>This is a div</div>'"></div>

        <div v-show="true">This div showed because v-show = true and v-show only affect css display, not remove div even
            if v-show=false</div>

        <div v-if="true">This div showed because v-if = true and v-if will remove div if v-if=false</div>

        <div v-if="Math.random() > 0.5">
            This div show because v-else=false
        </div>
        <div v-else>
            This div show because v-else=true
        </div>

        <ul>
            <li v-for="item in ['this', 'is', 'v-for']">{{ item }}</li>
        </ul>

        <button v-on:click="showAlert">Click this will show an alert by v-on</button>
    </div>

</template>

<script setup lang="ts">
function showAlert() {
    alert('Hello there')
}
</script>