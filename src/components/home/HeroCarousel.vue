<template>
  <div class="relative w-full overflow-hidden group">
    <!-- Slides -->
    <div
      class="flex transition-transform duration-700 ease-in-out"
      :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
    >
      <div
        v-for="(slide, index) in slides"
        :key="index"
        class="w-full flex-shrink-0 relative"
      >
        <!-- Image -->
        <img
          :src="slide.image"
          :alt="slide.title"
          class="w-full h-96 object-cover"
        />

        <!-- Gradient overlays -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80 dark:from-gray-900/80 dark:via-transparent dark:to-gray-900/80 pointer-events-none"
        ></div>

        <!-- Text overlay -->
        <div
          class="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
        >
          <h2
            class="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-2"
          >
            {{ slide.title }}
          </h2>
          <p class="text-gray-700 dark:text-gray-300 max-w-xl">
            {{ slide.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- Navigation Buttons -->
    <button
      @click="prevSlide"
      class="absolute top-1/2 -translate-y-1/2 left-4 p-2 bg-white/70 dark:bg-gray-900/70 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
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
      class="absolute top-1/2 -translate-y-1/2 right-4 p-2 bg-white/70 dark:bg-gray-900/70 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"
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

    <!-- Pagination Indicators -->
    <div class="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
      <span
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        class="cursor-pointer transition-all duration-500 ease-in-out rounded-full"
        :class="[
          currentSlide === index
            ? 'w-6 h-2 bg-gray-50 dark:bg-gray-50'
            : 'w-2 h-2 bg-gray-400 dark:bg-gray-400',
        ]"
      ></span>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const slides = ref([
  {
    image: '/src/assets/images/sample1.jpg',
    title: 'Modern Frontend Development',
    description: 'Crafting beautiful interfaces with Vue 3 and Tailwind CSS.',
  },
  {
    image: '/src/assets/images/sample2.jpg',
    title: 'Smooth User Experience',
    description: 'Delivering seamless transitions and fluid animations.',
  },
  {
    image: '/src/assets/images/sample3.jpg',
    title: 'Responsive by Design',
    description: 'Optimized layouts for every device and theme mode.',
  },
]);

const currentSlide = ref(0);

function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length;
}

function prevSlide() {
  currentSlide.value =
    (currentSlide.value - 1 + slides.value.length) % slides.value.length;
}

function goToSlide(index) {
  currentSlide.value = index;
}
</script>
