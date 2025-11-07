<script setup>
import { watch, onUnmounted } from 'vue'
import SocialLink from './SocialLink.vue'

import telegram from '@/assets/icons/icons8-telegram-app.svg'
import greenapp from '@/assets/icons/icons8-whatsapp.svg'
import gmail from '@/assets/icons/icons8-gmail.svg'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})
// watcher disables background scroll when modal is open
watch(
  () => props.isOpen,
  newVal => {
    document.body.style.overflow = newVal ? 'hidden' : ''
  }
)
// safety cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})

// emit event for closing modal
const emit = defineEmits(['close'])

// handle outside click (click on overlay closes modal)
const handleOverlayClick = e => {
  if (e.target === e.currentTarget) {
    emit('close')
  }
}
</script>

<template>
  <!-- Transition for smooth spring pop -->
  <Transition
    enter-active-class="transition-all duration-500 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]"
    enter-from-class="scale-75 opacity-0"
    enter-to-class="scale-100 opacity-100"
    leave-active-class="transition-all duration-300 ease-in-out"
    leave-from-class="scale-100 opacity-100"
    leave-to-class="scale-90 opacity-0"
  >
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[999] flex items-center justify-center bg-black/80 backdrop-blur-sm min-h-screen"
      @click="handleOverlayClick"
    >
      <!-- Modal content container -->
      <div
        class="relative flex flex-col h-auto p-6 space-y-4 text-white transition-transform transform bg-white border shadow-2xl rounded-2xl dark:bg-[#323435] w-72 md:w-96 border-gray-500"
      >
        <!-- Close button -->
        <button
          @click="$emit('close')"
          class="absolute text-3xl text-black transition-colors dark:text-white top-3 right-3 hover:text-red-500"
        >
          X
        </button>

        <!-- Modal content -->
        <div class="flex flex-col text-gray-900">
          <h2 class="mb-4 text-[17px] font-semibold text-start dark:text-gray-50">
            Send me a message
          </h2>
          
          <div class="flex flex-col space-y-5 font-medium pe-5">
            <!-- WhatsApp -->
            <div class="flex flex-row items-center justify-between text-lg dark:text-white">
              <div class="flex items-center w-full space-x-4">
              <SocialLink 
                        href="https://wa.me/254792684339?text=Hi!%20I%20am%20interested%20in%20your%20services"
                        :icon="greenapp"
                        label="Facebook"
                        tooltip="Reach out on Whatsapp"
                    />
              <span class="text-sm">WhatsApp</span>
              </div>
              
            </div>
            <!-- Telegram -->
            <div class="flex flex-row items-center justify-between text-lg dark:text-white">
              <div class="flex items-center w-full space-x-4">
              <SocialLink 
                        href="https://facebook.com"
                        :icon="telegram"
                        label="Telegram"
                        tooltip="Check me out on facebook"
                    />
              <span class="text-sm">WhatsApp</span>
              </div>
            </div>
            <!--Gmail-->
            <div class="flex flex-row items-center justify-between text-lg dark:text-white">
              <div class="flex items-center w-full space-x-4">
              <SocialLink 
                        href="mailto:gitongacharlie01@gmail.com?subject=Website%20Inquiry&body=Hello%2C%0AI%20would%20like%20to%20know%20more%20about%20your%20services."
                        :icon="gmail"
                        label="Gmail"
                        tooltip="Check me out on facebook"
                    />
              <span class="text-sm">Gmail</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>
