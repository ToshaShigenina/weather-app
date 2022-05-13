import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

import 'css-reset-and-normalize'
import '@/assets/css/main.css'
import '@/assets/css/buttons.css'

createApp(App).use(store).mount('#app')
