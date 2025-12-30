<script setup lang="ts">
import { ref } from "vue";

const text = ref("Hello, this is a text to speech streaming test.");
const audioUrl = ref<string | null>(null);

function playTTS() {
  // Encode text so it’s safe for a query string
  const encoded = encodeURIComponent(text.value);
  audioUrl.value = `/tts-stream?text=${encoded}`;
}
</script>

<template>
  <div class="hello-world">
    <textarea v-model="text" rows="4" />

    <button @click="playTTS">
      Play TTS
    </button>

    <audio
      v-if="audioUrl"
      :src="audioUrl"
      controls
      autoplay
    />
  </div>
</template>

<style scoped>
.hello-world {
  background: wheat;
  padding: 16px;
}

textarea {
  width: 100%;
  margin-bottom: 8px;
}

button {
  margin-bottom: 12px;
}
</style>
