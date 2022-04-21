/*
 * @Descripttion: 全局注册组件
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-08 16:18:31
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-13 10:44:49
 */
import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import Back from './Back/index.vue'

export function setupGlobalCom(app:App<Element>) {

  app.component(SvgIcon.name, SvgIcon)
  
  app.component(Back.name, Back)

}
