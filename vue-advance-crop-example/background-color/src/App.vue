<template>
  <div class="p-6">
    <!-- Upload input -->
    <input
      type="file"
      accept="image/*"
      multiple
      @change="onUpload"
      class="mb-4 block"
    />

    <h2>JPG</h2>
    <div class="grid grid-cols-3 gap-3 mt-4">
      <img
        v-for="(img, index) in croppedImagesJPG"
        :key="index"
        :src="img"
        class="w-full rounded border object-contain"
      />
    </div>

    <h2>PNG</h2>
    <div class="grid grid-cols-3 gap-3 mt-4">
      <img
        v-for="(img, index) in croppedImagesPNG"
        :key="index"
        :src="img"
        class="w-full rounded border object-contain"
      />
    </div>

    <h2>Custom color</h2>
    <div class="grid grid-cols-3 gap-3 mt-4">
      <img
        v-for="(img, index) in croppedImagesCUSTOM"
        :key="index"
        :src="img"
        class="w-full rounded border object-contain"
      />
    </div>

    <!-- Popup -->
    <div
      v-if="showPopup"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
    >
      <div class="w-[90vw] h-[90vh] overflow-hidden rounded-lg bg-white">
        <!-- TOP: Image preview -->
        <div
          class="relative flex w-full h-[90%] items-center justify-center bg-green-500"
        >
          <!-- Left -->
          <button
            class="absolute left-3 text-3xl text-white disabled:opacity-30"
            @click="prevImage"
            :disabled="currentIndex === 0"
          >
            ‹
          </button>

          <cropper
            ref="cropperRef"
            class="border border-red-400"
            backgroundClass="custom-cropper-background"
            :src="currentImage"
            :stencil-props="{
              aspectRatio: '16:9' === '16:9' ? 16 / 9 : 9 / 16,
            }"
            image-restriction="none"
            @change="change"
          />

          <!-- Right -->
          <button
            class="absolute right-3 text-3xl text-white disabled:opacity-30"
            @click="nextImage"
            :disabled="currentIndex === images.length - 1"
          >
            ›
          </button>

          <!-- Counter -->
          <div class="absolute bottom-2 text-xs text-white">
            {{ currentIndex + 1 }} / {{ images.length }}
          </div>
        </div>

        <!-- BOTTOM: Actions -->
        <div
          class="h-[10%] w-full flex flex-wrap justify-end gap-2 border-t p-4"
        >
          <button
            class="rounded border px-3 py-1 text-sm hover:bg-gray-100"
            @click="onCancel"
          >
            Hủy
          </button>

          <button
            class="rounded border px-3 py-1 text-sm hover:bg-gray-100"
            @click="onReset"
          >
            Đặt lại
          </button>

          <button
            class="rounded border px-3 py-1 text-sm hover:bg-gray-100"
            @click="setRatio169"
          >
            16:9
          </button>

          <button
            class="rounded border px-3 py-1 text-sm hover:bg-gray-100"
            @click="setRatio916"
          >
            9:16
          </button>

          <button
            class="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
            @click="onCrop"
          >
            Cắt
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.custom-cropper-background {
  background: #ffd700;
}
</style>

<script setup lang="ts">
import { ref, computed } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const images = ref<string[]>([]);
const currentIndex = ref(0);
const showPopup = ref(false);

function onUpload(event: Event) {
  const files = (event.target as HTMLInputElement).files;
  if (!files) return;

  images.value = Array.from(files).map((file) => URL.createObjectURL(file));

  currentIndex.value = 0;
  showPopup.value = images.value.length > 0;
}

function prevImage() {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  }
}

function nextImage() {
  if (currentIndex.value < images.value.length - 1) {
    currentIndex.value++;
  }
}

const currentImage = computed(() => images.value[currentIndex.value]);

function onCancel() {
  showPopup.value = false;
}
function onReset() {}
function setRatio169() {}
function setRatio916() {}
function onCrop() {
  showPopup.value = false;
}

const croppedImagesJPG = ref<string[]>([]);
const croppedImagesPNG = ref<string[]>([]);
const croppedImagesCUSTOM = ref<string[]>([]);

// function change(e: any) {
//   if (!e.canvas) return

//   //Extra region outside of image = transparent
//   //jpg = turn transparent to black default
//   //png = keep
//   croppedImages.value[currentIndex.value] =
//     e.canvas.toDataURL('image/png', 0.9)
// }

const CROP_BACKGROUND_COLOR = "#FFD700";

function handleChangeCustomBackground(canvas: any) {
  const sourceCanvas = canvas;

  const output = document.createElement("canvas");
  output.width = sourceCanvas.width;
  output.height = sourceCanvas.height;

  const ctx = output.getContext("2d");
  if (!ctx) return;

  // 🔴 IMPORTANT: fill background first
  ctx.fillStyle = CROP_BACKGROUND_COLOR;
  ctx.fillRect(0, 0, output.width, output.height);

  // draw cropped image on top
  ctx.drawImage(sourceCanvas, 0, 0);

  croppedImagesCUSTOM.value[currentIndex.value] = output.toDataURL(
    "image/jpeg",
    0.9
  ); // or png
}

function change(e: any) {
  if (!e.canvas) return;

  //Extra region outside of image = transparent
  //jpg = turn transparent to black default
  croppedImagesJPG.value[currentIndex.value] = e.canvas.toDataURL(
    "image/jpg",
    0.9
  );

  croppedImagesPNG.value[currentIndex.value] = e.canvas.toDataURL(
    "image/png",
    0.9
  );

  handleChangeCustomBackground(e.canvas);
}
</script>
