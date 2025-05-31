import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//import vIntersect from './directives/v-intersect'

const app = createApp(App)
app.use(router) // 确保在挂载之前使用路由
//app.directive('intersect', vIntersect)
app.mount('#app')

app.directive('intersect', {
  mounted(el, binding) {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        binding.value()
        observer.unobserve(el)
      }
    })
    observer.observe(el)
  }
})

