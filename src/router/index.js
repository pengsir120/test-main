import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (store.state.routes.length === 0) { // 路由信息是不是组装完
    store.dispatch('generateRoutes').then(accessRoutes => { // 生成可访问的路由表
      router.addRoutes(accessRoutes) // 动态添加可访问路由表
      next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
    })
  } else { // 进入页面前设置菜单
    next()
  }
})

export default router
