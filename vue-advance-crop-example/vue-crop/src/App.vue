<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const img = ref<string | null>(null);
const showModal = ref(false);

const cropperRef = ref<InstanceType<typeof Cropper> | null>(null);
const cropperContainer = ref<HTMLElement | null>(null);
const modalUpper = ref<HTMLElement | null>(null);

//Dynamic setting cropper width/height respect to it's container also keeping aspect ratio
const updateContainerSize = () => {
  if (!cropperContainer.value || !modalUpper.value) return;

  const maxWidth = modalUpper.value.clientWidth - 24;
  const maxHeight = modalUpper.value.clientHeight - 24;

  cropperContainer.value.style.width = `${maxWidth}px`;
  cropperContainer.value.style.height = `${maxHeight}px`;
};

// 16:9 default
const aspectRatio = ref<"16:9" | "9:16">("16:9");

onMounted(() => {
  window.addEventListener("resize", updateContainerSize);
});

watch([aspectRatio, showModal], () => {
  if (showModal.value) {
    setTimeout(updateContainerSize);
  }
});

watch(aspectRatio, updateContainerSize);

const onFileChange = (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = () => {
    img.value = reader.result as string;
    showModal.value = true;
    setTimeout(updateContainerSize); // ensure DOM ready
  };
  reader.readAsDataURL(file);
};

const cancelCrop = () => {
  showModal.value = false;
  img.value = null;
};

const resetCrop = () => {
  cropperRef.value?.reset();
};

const saveCrop = () => {
  const result = cropperRef.value?.getResult();
  if (!result?.canvas) return;

  const croppedImage = result.canvas.toDataURL("image/png");
  console.log("Cropped image:", croppedImage);

  showModal.value = false;
};
</script>

<template>
  <div>
    <!-- Controls OUTSIDE -->
    <div class="controls">
      <input type="file" accept="image/*" @change="onFileChange" />

      <select v-model="aspectRatio">
        <option value="16:9">16 : 9</option>
        <option value="9:16">9 : 16</option>
      </select>
    </div>

    <!-- MODAL -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content" style="padding: 0px">
        <!-- Cropper Container -->

        <div
          ref="modalUpper"
          class="modal-upper"
          style="
            background-color: red;
            height: 90%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;      
          "
        >
          <div
            ref="cropperContainer"
            class="cropper-container"
            style="background-color: red"
          >
            <cropper
              ref="cropperRef"
              v-if="img"
              class="cropper"
              :src="img"
              :stencil-props="{
                aspectRatio: aspectRatio === '16:9' ? 16 / 9 : 9 / 16,
              }"
              image-restriction="none"
            />
          </div>
        </div>

        <div
          class="modal-lower"
          style="
            background-color: green;
            height: 10%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          "
        >
          <div class="modal-actions">
            <button @click="cancelCrop">Cancel</button>
            <button @click="resetCrop">Reset</button>
            <button class="primary" @click="saveCrop">Save</button>
          </div>
        </div>

        <!-- Buttons -->
        <!--  -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.controls {
  display: flex;
  gap: 12px;
  align-items: center;
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  width: 90vw;
  height: 90vh;
  background: #fff;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
}

/* Cropper container respects your sizing logic */
.cropper-container {
  background: #ddd;
}

.cropper {
  width: 100%;
  height: 100%;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding: 12px;
  border-top: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

button.primary {
  background: #3b82f6;
  color: #fff;
  border: none;
}
</style>
