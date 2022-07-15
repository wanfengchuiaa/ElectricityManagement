import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/login')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
  },
  {
    path: '/layout',
    name: 'layout',
    component: () => import('@/views/layout')
  }
]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // 登录界面不需要验证 直接放行
  if (to.path === '/login') return next()
  // 从本地存储获取token
  const tokenStr = localStorage.getItem('dianshangToken')
  // 如果token 不存在跳转到login页面
  if (!tokenStr) return next('/login')
  // 其他情况直接放行
  next()
})
export default router
