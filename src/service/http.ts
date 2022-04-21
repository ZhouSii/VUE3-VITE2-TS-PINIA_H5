import axios from 'axios'
import { Toast, Dialog } from 'vant'
import { getToken, setToken } from '@/utils/auth'
import { AxiosConfigTy, AxiosReqTy, ObjTy } from '~/common'
import { goToLogin } from '../utils/'
let reqConfig: any
let loadingE: any

const service: any = axios.create()
// request
service.interceptors.request.use(
  (req: AxiosReqTy) => {
    // console.log('import.meta.env.VITE_APP_BASE_URL', import.meta.env.VITE_APP_BASE_URL)

    if (req.headers.noAuthorization) {
      req.headers['Authorization'] = req.headers.Authorization || ''
    } else {
      // token setting
      if (getToken()) req.headers['Authorization'] = 'Bearer ' + getToken()
    }

    req.headers['Content-Type'] = 'application/json;chartset=utf-8'
    /* download file*/
    if (req.isDownLoadFile) {
      req.responseType = 'blob'
    }
    /* upload file*/
    if (req.isUploadFile) {
      let param = new FormData()
      for (let item in req.data) {
        param.append(item, req.data[item])
      }
      req.headers['Content-Type'] = 'multipart/form-data'

      if (req.headers['x-file-bucket']) {
        req.headers['x-file-bucket'] = req.headers['x-file-bucket']
      }

      req.data = param
    }
    if (req.bfLoading) {
      loadingE = Toast.loading({
        message: '加载中',
        forbidClick: true,
        loadingType: 'spinner',
      })
    }
    /*
     *params会拼接到url上,such as  "a=1&b=2"
     * */
    if (req.isParams) {
      req.params = req.data
      req.data = {}
    }

    //save req for res to using
    reqConfig = req
    return req
  },
  (err: any) => {
    Promise.reject(err)
  }
)
//response
service.interceptors.response.use(
  (res: any) => {
    console.log('service.interceptors.response', res.data)

    if (reqConfig.afHLoading && loadingE) {
      loadingE.close()
    }
    // direct return, when download file
    if (reqConfig.isDownLoadFile) {
      return res
    }
    const { resp_msg, resp_code, isNeedUpdateToken, updateToken } = res.data
    //update token
    if (isNeedUpdateToken) {
      setToken(updateToken)
    }

    const successCode = '0,200,20000'
    if (successCode.indexOf(resp_code) !== -1) {
      //业务成功处理
      return res.data
    } else {
      //是否需要提示错误信息 isAlertErrorMsg:true 提示
      if (reqConfig.isAlertErrorMsg) {
        Toast({
          type: 'fail',
          message: resp_msg,
          duration: 2.5 * 1000,
        })
      }
      //返回错误信息
      //如果未catch 走unhandledrejection进行收集
      return Promise.reject(res.data)
    }
  },
  (err: any) => {
    console.log('err===err', err)
    console.log('err.response', err.response)

    /*http错误处理，处理跨域，404，401，500*/
    if (loadingE) loadingE.clear()
    if (err.response) {
      const errLog = err.response
      const status = err.response.status
      if (status === 401) {
        // 401:非法的token;Token 过期了;
        Dialog.alert({
          title: '提示',
          message: '登录信息已失效, 请重新登录！',
          confirmButtonColor: '#2F74ED',
          confirmButtonText: '确定',
        }).then(() => {
          goToLogin()
        })
      } else if (status === 502) {
      } else {
        Dialog.alert({
          title: '提示',
          message: errLog.data.resp_msg || '当前访问人数过多，请稍后再试!',
          confirmButtonColor: '#2F74ED',
          confirmButtonText: '确定',
        }).then(() => {})
      }
    } else {
      console.log('errRequest' + err) // for debug
      Dialog.alert({
        title: '提示',
        message: err.message,
        // message: errLog.data.msg,
        confirmButtonColor: '#2F74ED',
        confirmButtonText: '确定',
      }).then(() => {})
    }

    //如果是跨域
    //Network Error,cross origin
    const errObj: ObjTy = {
      msg: err.toString(),
      reqUrl: reqConfig.baseURL + reqConfig.url,
      params: reqConfig.isParams ? reqConfig.params : reqConfig.data,
    }
    return Promise.reject(JSON.stringify(errObj))
  }
)

export default function axiosReq({
  url,
  data,
  headers,
  method,
  isParams,
  bfLoading,
  afHLoading,
  isUploadFile,
  isDownLoadFile,
  baseURL,
  timeout,
  isAlertErrorMsg,
}: AxiosConfigTy): any {
  return service({
    url: url,
    method: method ?? 'get',
    data: data ?? {},
    headers: headers ?? {},
    isParams: isParams ?? false,
    bfLoading: bfLoading ?? true,
    afHLoading: afHLoading ?? true,
    isUploadFile: isUploadFile ?? false,
    isDownLoadFile: isDownLoadFile ?? false,
    isAlertErrorMsg: isAlertErrorMsg ?? true,
    baseURL: baseURL ?? import.meta.env.VITE_APP_BASE_API, // 设置基本基础url
    timeout: timeout ?? 15000, // 配置默认超时时间
  })
}
