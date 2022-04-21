/*
 * @Descripttion: 登陆接口
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 11:08:30
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-15 18:16:19
 */
export interface ILoginParams {
  grant_type: string
  username: string
  password: string | number
}

export interface ILoginApi {
  login: (params: ILoginParams) => Promise<any>
  info: () => Promise<any>
}

