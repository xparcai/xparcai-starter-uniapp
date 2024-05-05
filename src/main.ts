import { createSSRApp } from 'vue'
import App from './App.vue'
import { setupRouter } from './routes'
import { setupStore } from './stores'
import 'virtual:uno.css'
import './styles/index.scss'

export function createApp() {
  const app = createSSRApp(App)
  setupRouter(app)
  setupStore(app)
  return {
    app,
  }
}
