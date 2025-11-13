// useDark.js
import { ref, watch } from "vue"

const THEME_KEY = "theme"
const isDark = ref(false)

// Helper to apply theme instantly
function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add("dark")
    localStorage.setItem(THEME_KEY, "dark")
  } else {
    document.documentElement.classList.remove("dark")
    localStorage.setItem(THEME_KEY, "light")
  }
}

// --- Initialize Theme --- //
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

// --- Reactively watch changes --- //
watch(isDark, (val) => applyTheme(val))

export function useDark() {
  function toggleDark() {
    isDark.value = !isDark.value
  }
  return { isDark, toggleDark }
}
