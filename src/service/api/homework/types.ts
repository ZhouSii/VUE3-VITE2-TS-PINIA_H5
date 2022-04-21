/*
 * @Descripttion: 作业接口
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-15 10:46:01
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 18:00:52
 */
import { ObjTy } from '~/common'

export interface ListParams {
  current: number
  query: ObjTy
  size: number
}

export interface ExplainParams {
  homeworkId: number | string
}

export interface DetailsParams {
  homeworkId: number | string
  studentId: number | string
  paperId?: number | string
}

export interface DownloadDtkParams extends DetailsParams {}

// {
//   homeworkId: number | string
//   studentId: number | string
//   paperId?: number | string
// }

export interface UploadParams extends DetailsParams {
  url: string
}

export interface DetailsListParams extends DetailsParams {}

export interface SubmitParams extends DetailsParams {
  [propName: string]: any
}

export interface HomeworkApi {
  list: (params: ListParams) => Promise<any>
  explain: (params: ExplainParams) => Promise<any>
  details: (params: DetailsParams) => Promise<any>
  downloadDtk: (params: DownloadDtkParams) => Promise<any>
  upload: (params: UploadParams) => Promise<any>
  detailsList: (params: DetailsListParams) => Promise<any>
  submit: (params: Array<SubmitParams>) => Promise<any>
}
