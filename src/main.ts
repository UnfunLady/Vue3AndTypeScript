import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as api from'@/api'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app=createApp(App)
// 使用图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
  
app.config.globalProperties.$API=api
app.use(router).use(ElementPlus).mount('#app')

