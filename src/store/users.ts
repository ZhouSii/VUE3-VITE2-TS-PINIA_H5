/*
 * @Descripttion: 用户信息
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-14 14:13:52
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:41:48
 */
import { defineStore } from 'pinia'
import { ObjTy } from '~/common'
import loginApi from '@/service/api/login/'
import { ILoginParams } from '@/service/api/login/types'
import { setToken, setUserInfo, removeToken, removeUserInfo } from '@/utils/auth'

export const userStore = defineStore({
  id: 'users',
  state: (): ObjTy => ({
    userInfo: {},
  }),
  actions: {
    LOGIN(data: ILoginParams) {
      return new Promise<void>((resolve, reject) => {
        loginApi.login(data).then((response: any) => {
          const { resp_code, datas, resp_msg } = response
          if (resp_code === 0) {
            setToken(datas.access_token)
            resolve(datas.access_token)
          } else {
            reject(resp_msg)
          }
        })
      })
    },
    GetUserInfo() {
      return new Promise<void>((resolve, reject) => {
        loginApi.info().then((response: any) => {
          const { resp_code, datas, resp_msg } = response
          if (resp_code === 0) {
            this.userInfo = datas
            setUserInfo(datas)
            resolve()
          } else {
            reject(resp_msg)
          }
        })
      })
    },
    // 前端 登出
    FedLogOut() {
      return new Promise<void>((resolve) => {
        removeToken()
        removeUserInfo()
        resolve()
      })
    },
  },
})
