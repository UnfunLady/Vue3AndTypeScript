import { createApp } from 'vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as api from '@/api'
import App from './App.vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Header from '@/components/HeaderView/HeaderView.vue'
import Pagination from '@/components/Pagination/PaginationView.vue'
import { createPinia } from 'pinia'
import { usePersist } from 'pinia-use-persist'
// 动态数字
import { CountTo } from 'vue3-count-to';
// 创建pinia对象
const pinia = createPinia();
// 使用persist
pinia.use(usePersist);
const app = createApp(App)
// 使用图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.component('Header', Header)
app.component('Pagination', Pagination)
app.component('count-to', CountTo)
app.config.globalProperties.$API = api
app.use(router).use(pinia).use(ElementPlus).mount('#app')

