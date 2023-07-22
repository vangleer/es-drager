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
      title: '网格'
    }
  },
  {
    path: 'info',
    component: () => import('@/examples/info.vue'),
    meta: {
      title: '详情信息'
    }
  },
  {
    path: 'slot',
    component: () => import('@/examples/slot.vue'),
    meta: {
      title: '使用插槽'
    }
  },
  {
    path: 'chart',
    component: () => import('@/examples/chart.vue'),
    meta: {
      title: 'echarts 图表'
    }
  },
  {
    path: 'markline',
    component: () => import('@/examples/markline.vue'),
    meta: {
      title: '辅助线'
    }
  },
  {
    path: 'group',
    component: () => import('@/examples/group.vue'),
    meta: {
      title: '组合与拆分'
    }
  },
  {
    path: 'temp',
    component: () => import('@/examples/temp.vue'),
    meta: {
      title: 'temp'
    }
  }
]

const routes: RouteRecordRaw[] = [
	{
		path: '/',
    component: Home,
    redirect: '/basic',
    children: menuRoutes
	},
  {
		path: '/editor',
    component: () => import('@/views/editor/index.vue')
	},
]

const router = createRouter({
	history: createWebHashHistory(),
	routes
})

export default router
