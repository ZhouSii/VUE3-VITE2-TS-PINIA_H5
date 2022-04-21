/*
 * @Descripttion: 入口文件
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-06 14:22:34
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:38:28
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import { createPinia } from 'pinia'
import { vantPlugins } from './plugins/vant'
import { setupGlobalCom } from './components'
// global css
import '@/styles/index.scss'
import './permission'

//import vant doc :  https://vant-contrib.gitee.io/vant/v3/#/zh-CN/advanced-usage
// import 'amfe-flexible/index.js'

const app = createApp(App)

// 注册全局组件
setupGlobalCom(app)
// app.use(Button)
app.use(router)
app.use(vantPlugins)

app.use(createPinia())

app.mount('#app')
