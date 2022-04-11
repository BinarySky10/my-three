import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHistory } from 'vue-router'

import MineSweeper from '@/views/mine-sweeper.vue' // todo 引入组件需要手动配置, 可优化成为自动引用文件夹中的
import ThreeView from '@/views/three-view.vue'
import SystemTest from '@/views/system-test.vue'
const routes: Array<RouteRecordRaw> = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: MineSweeper,
  // },
  // {
  //   path: '/',
  //   name: 'home',
  //   component: ThreeView,
  // },
  {
    path: '/',
    name: 'home',
    component: SystemTest,
  },

]

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
