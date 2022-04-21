/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 11:08:30
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-14 10:51:39
 */
//common type file, you can not export the type in common.d.ts
//not export can use
interface ObjTy {
  [propName: string]: any
}

/*axiosReq请求配置*/
import { AxiosRequestConfig } from 'axios'
interface AxiosReqTy extends AxiosRequestConfig {
  url?: string
  method?: string
  data?: ObjTy
  headers?: any
  isParams?: boolean
  bfLoading?: boolean
  afHLoading?: boolean
  isUploadFile?: boolean
  isDownLoadFile?: boolean
  isAlertErrorMsg?: boolean
  baseURL?: string
  timeout?: number
}
interface AxiosConfigTy {
  url?: string
  method?: string
  data?: ObjTy
  headers?: ObjTy
  isParams?: boolean
  bfLoading?: boolean
  afHLoading?: boolean
  isUploadFile?: boolean
  isDownLoadFile?: boolean
  isAlertErrorMsg?: boolean
  baseURL?: string
  timeout?: number
}
