/*
 * @Descripttion: 公共接口
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-20 14:40:11
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 15:10:05
 */
export interface uploadFileParams {
  file: any
  fileBucket?: string
}

export interface CommonApi {
  uploadFile: (params: uploadFileParams) => Promise<any>
}
