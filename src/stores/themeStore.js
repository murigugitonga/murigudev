import { defineStore } from "pinia";
import { ref, watch, onMounted } from "vue";

export const useThemeStore = defineStore("theme", () => {
  const THEME_KEY = "theme";
  const isDark = ref(false);

  function applyTheme(dark) {
    const html = document.documentElement;

    if (dark) {
      html.classList.add("dark");
      localStorage.setItem(THEME_KEY, "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem(THEME_KEY, "light");
    }
  }

  // Run only after DOM exists
  onMounted(() => {
    const storedTheme = localStorage.getItem(THEME_KEY);

    if (storedTheme) {
      isDark.value = storedTheme === "dark";
    } else {
      isDark.value = window.matchMedia("(prefers-color-scheme: dark)").matches;
    }

    applyTheme(isDark.value);
  });

  // Watch the value and apply theme
  watch(
    isDark,
    (val) => applyTheme(val),
    { flush: "post" }
  );

  function toggleTheme() {
    isDark.value = !isDark.value;
  }

  return { isDark, toggleTheme };
});
