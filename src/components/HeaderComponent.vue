<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useThemeStore } from "@/stores/themeStore";

const theme = useThemeStore();

const opacity = ref(1);  
const threshold = 300; // how many px to reach opacity 0

const animating = ref(false);

function switchTheme() {
  animating.value = true;
  theme.toggleTheme();
  setTimeout(() => (animating.value = false), 300);
}

function handleScroll() {
  const y = window.scrollY;
  const fade = Math.max(0, 1 - y / threshold);
  opacity.value = fade;
}

onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll));
</script>

<template>
  <header
    class="
      fixed top-0 left-0 w-full px-4 py-4 z-50
      md:rounded-lg border-b bg-gray-200 dark:bg-[#101011]
      shadow-sm dark:border-gray-700 border-gray-300
      transition-all duration-150 pointer-events-auto
    "
    :style="{ opacity: opacity }"
  >
    <div class="flex flex-row justify-between w-full lg:container lg:mx-auto">
      <img
        src="@/assets/images/murigu.png"
        class="w-1/3 h-auto lg:w-1/4"
        alt=""
      />

      <button
        @click="switchTheme"
        class="
          text-xl focus:outline-none relative
          w-10 h-10 flex items-center justify-center
          bg-white dark:bg-[#181818]
          transition-all duration-300 hover:scale-110 active:scale-95
        "
        :class="{ 'animate-spin': animating }"
      >
        <!-- DARK ICON -->
        <span
          v-if="theme.isDark"
          class="absolute transition-opacity duration-300"
          :class="{ 'opacity-0': animating }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            viewBox="0 -960 960 960"
            fill="#fefefe"
          >
            <path
              d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 
              35t-35 85q0 50 35 85t85 35Zm0 
              80q-83 0-141.5-58.5T280-480q0-83 
              58.5-141.5T480-680q83 0 141.5 
              58.5T680-480q0 83-58.5 
              141.5T480-280Z"
            />
          </svg>
        </span>

        <!-- LIGHT ICON -->
        <span
          v-else
          class="absolute transition-opacity duration-300"
          :class="{ 'opacity-0': animating }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-8 h-8"
            viewBox="0 -960 960 960"
            fill="#5f6368"
          >
            <path
              d="M480-120q-150 0-255-105T120-480q0-150 
              105-255t255-105q14 0 27.5 1t26.5 
              3q-41 29-65.5 75.5T444-660q0 90 63 
              153t153 63q55 0 101-24.5t75-65.5q2 13 
              3 26.5t1 27.5q0 150-105 
              255T480-120Z"
            />
          </svg>
        </span>
      </button>
    </div>
  </header>
</template>

<style scoped>
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 0.3s linear;
}
</style>
