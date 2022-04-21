/*
 * @Descripttion: 路由表
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-06 14:22:34
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 15:57:59
 */
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import exampleRouter from '@/router/modules/example'

// 联合类型
type RouteConfig = RouteRecordRaw & { hidden?: boolean } //hidden 是可选属性

const routes: RouteConfig[] = [
  {
    path: '/redirect/:path(.*)',
    component: () => import('@/views/redirect'),
    hidden: true,
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true,
  },
  {
    path: '/',
    meta: { title: '玖为教育' },
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
  },
  {
    path: '/login',
    meta: { title: '玖为教育' },
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/homework',
    meta: { title: '玖为教育' },
    name: 'Homework',
    component: () => import('@/views/homework/index.vue'),
  },
  {
    path: '/homeworkList',
    meta: { title: '玖为教育' },
    name: 'HomeworkList',
    component: () => import('@/views/homework/list.vue'),
  },
  {
    path: '/homeworkExplain',
    meta: { title: '玖为教育' },
    name: 'HomeworkExplain',
    component: () => import('@/views/homework/explain.vue'),
  },
  {
    path: '/homeworkDetails',
    meta: { title: '玖为教育' },
    name: 'HomeworkDetails',
    component: () => import('@/views/homework/details.vue'),
  },
  {
    path: '/homeworkPhoto',
    meta: { title: '玖为教育' },
    name: 'HomeworkPhoto',
    component: () => import('@/views/homework/photo.vue'),
  },
  {
    path: '/homeworkFeedback',
    meta: { title: '玖为教育' },
    name: 'HomeworkFeedback',
    component: () => import('@/views/homework/feedback.vue'),
  },
  ...exampleRouter,
  // 404 page must be placed at the end !!!
  // using pathMatch install of "*" in vue-router 4.0
  { path: '/:pathMatch(.*)', redirect: '/404', hidden: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
