import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router/index'
import { setupStore } from './store/index'

import '@style/style.css'

const app = createApp(App)


// mount router
setupRouter(app)

// mount state management
setupStore(app)

router.beforeEach((to, from ,next) => {
  next()
})

router.isReady().then(() => {
  if (!app) return
  app.mount('#app')
})


