<script setup>
import { ref } from 'vue'

const props = defineProps({
  paperTitle: { type: String, required: true },
  paperDescript: { type: String, required: true },
  pdfFile: { type: String, required: true }, // e.g. "predictive-policing.pdf"
})

const isDownloading = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const toastType = ref('success') // 'success' | 'error'

// Utility to show popup message
const showPopup = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true

  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

// Download handler
const downloadPDF = async () => {
  try {
    isDownloading.value = true
    const fileUrl = `/pdfs/${props.pdfFile}`

    const response = await fetch(fileUrl)
    if (!response.ok) throw new Error('File not found.')

    const blob = await response.blob()
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = props.pdfFile
    document.body.appendChild(link)
    link.click()
    link.remove()
    URL.revokeObjectURL(link.href)

    showPopup('✅ Download complete!', 'success')
  } catch (error) {
    console.error('Download failed:', error)
    showPopup('❌ Download failed. Try again.', 'error')
  } finally {
    isDownloading.value = false
  }
}
</script>

<template>
  <div class="relative">
    <!-- Toast Notification -->
    <transition name="fade">
      <div
        v-if="showToast"
        :class="[
          'fixed top-6 right-6 px-4 py-2 rounded-lg shadow-lg text-white text-sm z-50 transition-opacity',
          toastType === 'success' ? 'bg-green-600' : 'bg-red-600',
        ]"
      >
        {{ toastMessage }}
      </div>
    </transition>

    <!-- Main Card -->
    <div
      class="flex items-center w-full space-x-5 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
    >
      <!-- PDF ICON -->
      <img
        src="@/assets/icons/PDF_file_icon.svg"
        alt="PDF file"
        class="w-10 h-10"
      />

      <div class="flex items-center justify-between w-full">
        <div class="flex flex-col space-y-1">
          <h2 class="font-medium dark:text-gray-100">{{ paperTitle }}</h2>
          <p class="text-xs text-gray-600 dark:text-gray-400">
            {{ paperDescript }}
          </p>
        </div>

        <!-- Download Button -->
        <button
          @click="downloadPDF"
          :disabled="isDownloading"
          class="relative flex items-center justify-center p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
        >
          <!-- Spinner while downloading -->
          <svg
            v-if="isDownloading"
            class="animate-spin h-5 w-5 text-gray-700 dark:text-gray-300"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>

          <!-- Normal Download Icon -->
          <img
            v-else
            src="@/assets/icons/download-svgrepo-com.svg"
            alt="Download"
            class="w-6 h-6 dark:invert"
          />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
