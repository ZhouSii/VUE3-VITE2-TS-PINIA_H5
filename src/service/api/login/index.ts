/*
 * @Descripttion: 登陆接口
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 11:08:30
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-14 15:05:18
 */
//login.ts
import http from '@/service/http'
import * as T from './types'

const loginApi: T.ILoginApi = {
  login(data) {
    return http({
      url: '/api-uaa/oauth/token',
      data,
      method: 'post',
      headers: {
        noAuthorization: true,
        Authorization: 'Basic YXBwOmFwcA==',
      },
      bfLoading: true,
      isUploadFile: true,
    })
  },
  info() {
    return http({
      url: '/api-system/sys/ipad/account/current',
      method: 'get',
      bfLoading: true,
    })
  },
}

export default loginApi
