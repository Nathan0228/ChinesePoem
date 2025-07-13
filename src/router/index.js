import { createRouter, createWebHistory } from 'vue-router'; // 使用命名导出

const routes = [
    {
        path:"/",
        name:"Home",
        component: () => import('../views/PoemHome.vue'), // 异步加载组件
        meta:{
            title: '首页' // 设置页面标题
        }
    },
    {
      path:"/poem/:index",
      name:"PoemDetail",
      component: () => import('../views/PoemDetail.vue'),
      meta:{
        title: '诗词详情'
      }
    }

];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // 使用浏览器历史模式
    routes, // 路由配置
});

export default router; // 导出路由实例q
