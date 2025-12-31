<template>
  <cropper
    ref="cropperRef"
    :src="@/public/cat.jpg"

  />
</template>

<style></style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const cropperRef = ref<any>(null)

</script>
