import { createPinia} from 'pinia'
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import "./components/composables/useDark.js"
import { createApp } from 'vue'
import '../src/assets/tailwind.css'
// import 'vue3-marquee/dist/style.css'
import App from './App.vue'

import router from './router'
import Vue3Marquee  from 'vue3-marquee'

const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia)
app.use(router)
app.use(Vue3Marquee)

app.mount('#app')

