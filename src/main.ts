import { createApp } from 'vue'
import '@/assets/style/index.scss'
import App from './App.vue'
import router from '@/router/index'
import store from './store'
// createApp(App).mount('#app')

const app = createApp(App)
app.use(router)
app.use(store)

app.mount('#app')
