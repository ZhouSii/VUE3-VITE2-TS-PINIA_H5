/*
 * @Descripttion: 权限设置
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-11 11:21:03
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-14 14:09:10
 */
import router from './router'
// import settings from './settings'
import { getToken } from './utils/auth'

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to: any, from: any, next: any) => {
  /*路由发生改变修改页面的title */
  if (getToken()) {
    if (to.meta.title) {
      document.title = to.meta.title
    }
    next()
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {})
