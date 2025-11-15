import { defineStore } from "pinia";

import { ref, watch } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const THEME_KEY = "theme"
  const isDark = ref(false) // initial mode is light

  // apply theme immediately on load
  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem(THEME_KEY, "dark") // store in localStorage for later inference
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem(THEME_KEY, "light")
    }
  }

  // Initialize theme based on user preference
  const storedTheme = localStorage.getItem(THEME_KEY)
  if (storedTheme) {
    isDark.value = storedTheme === "dark"
    applyTheme(isDark.value)
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    isDark.value = true
    applyTheme(true)
  } else {
    applyTheme(false)
  }

  //  Watch for changes
  watch(isDark,  val => applyTheme(val))

  // toggle themes flawlessly
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  return { isDark, toggleTheme }
})