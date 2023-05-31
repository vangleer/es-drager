import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/views/Home.vue'

export const menuRoutes: RouteRecordRaw[] = [
  {
    path: 'basic',
    component: () => import('@/examples/basic.vue'),
    meta: {
      title: '基础示例'
    }
  },
  {
    path: 'event',
    component: () => import('@/examples/event.vue'),
    meta: {
      title: '事件相关'
    }
  },
  {
    path: 'grid',
    component: () => import('@/examples/grid.vue'),
    meta: {
      title: '详情信息'
    }
  },
  {
    path: 'info',
    component: () => import('@/examples/info.vue'),
    meta: {
      title: '使用插槽'
    }
  },
  {
    path: 'slot',
    component: () => import('@/examples/slot.vue'),
    meta: {
      title: '网格'
    }
  }
]

const routes: RouteRecordRaw[] = [
	{
		path: '/',
    component: Home,
    redirect: '/basic',
    children: menuRoutes
	}
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
