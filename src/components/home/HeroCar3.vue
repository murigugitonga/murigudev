<template>
  <div class="relative w-full overflow-hidden md:max-w-screen-sm lg:max-w-screen-lg group">
    <!-- Slides -->
    <div
      class="flex transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="relative flex-shrink-0 w-full"
      >
        <!-- Image -->
        <img
          :src="slide.image"
          :alt="slide.title"
          class="object-cover w-full h-96"
        />

        <!-- Gradient overlays -->
        <div
          class="absolute inset-0 pointer-events-none bg-gradient-to-r from-white/80 via-transparent to-white/80 dark:from-gray-900/80 dark:via-transparent dark:to-gray-900/80"
        ></div>

        <!-- Text overlay -->
        <div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center background-blur-sm">
          <h2 class="mb-2 text-3xl font-semibold text-gray-800 dark:text-gray-100">
            {{ slide.title }}
          </h2>
          <p class="max-w-xl text-gray-700 dark:text-gray-300">
            {{ slide.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="prevSlide"
      class="absolute p-2 transition-opacity duration-500 ease-in-out -translate-y-1/2 rounded-full shadow-md opacity-0 top-1/2 left-4 bg-white/70 dark:bg-gray-900/70 group-hover:opacity-100"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-gray-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <button
      @click="nextSlide"
      class="absolute p-2 transition-opacity duration-500 ease-in-out -translate-y-1/2 rounded-full shadow-md opacity-0 top-1/2 right-4 bg-white/70 dark:bg-gray-900/70 group-hover:opacity-100"
    >
      <svg
        class="w-6 h-6 text-gray-800 dark:text-gray-100"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
    </button>

    <!-- Modern Pagination Indicators -->
    <div
      class="absolute flex space-x-3 transform -translate-x-1/2 bottom-6 left-1/2"
    >
      <span
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] rounded-full"
        :class="[
          currentSlide === index
            ? 'w-6 h-2 bg-gray-800 dark:bg-gray-50'
            : 'w-2 h-2 bg-gray-400 dark:bg-gray-500',
        ]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

//import img1 from "../assets/images/modifiedBSCard.png";
import img2 from "@/assets/images/muriguprograms.png";
import img3 from "@/assets/images/servers.jpeg";
import img4 from "@/assets/images/compProgrammer.png";

const slides = ref([
  {
    image: img3,
    title: 'Modern Frontend Development',
    description: 'Crafting beautiful interfaces with Vue 3 and Tailwind CSS.',
  },
  {
    image: img2,
    title: 'Smooth User Experience',
    description: 'Delivering seamless transitions and fluid animations.',
  },
  {
    image: img4,
    title: 'Responsive by Design',
    description: 'Optimized layouts for every device and theme mode.',
  },
])

const currentSlide = ref(0)
let autoSlideInterval = null

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

function goToSlide(index) {
  currentSlide.value = index
}

// ✅ Auto-slide logic
onMounted(() => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000) // 5 seconds per slide

  // Pause auto-slide when hovering
  const carousel = document.querySelector('.group')
  carousel.addEventListener('mouseenter', pauseAutoSlide)
  carousel.addEventListener('mouseleave', resumeAutoSlide)
})

onUnmounted(() => {
  clearInterval(autoSlideInterval)
})

function pauseAutoSlide() {
  clearInterval(autoSlideInterval)
}

function resumeAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}
</script>
