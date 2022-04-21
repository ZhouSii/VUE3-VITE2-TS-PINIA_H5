/*
 * @Descripttion: 作业接口
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-15 10:45:56
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 17:57:02
 */
import http from '@/service/http'
import * as T from './types'

const homeworkApi: T.HomeworkApi = {
  // 列表数据
  list(data) {
    return http({
      url: '/api-exercise/exercise/homework/student/pageList',
      method: 'post',
      data,
    })
  },
  // 讲解
  explain(data) {
    return http({
      url: '/api-exercise/exercise/homework/class/relative/list/questionParsing',
      method: 'get',
      isParams: true,
      data,
    })
  },
  // 详情
  details(data) {
    return http({
      url: '/api-exercise/exercise/homework/student/details/questionInfoList',
      method: 'get',
      isParams: true,
      data,
    })
  },
  // 下载答题卡
  downloadDtk(data) {
    return http({
      url: '/api-exercise/exercise/homework/info/app/download/smartUrl',
      method: 'get',
      isParams: true,
      isDownLoadFile: true,
      data,
    })
  },
  // 上传作业图片
  upload(data) {
    return http({
      url: '/api-exercise/exercise/homework/student/upload/homework',
      method: 'post',
      data,
    })
  },
  // 获取题目详情列表-用于学生错题反馈
  detailsList(data) {
    return http({
      url: '/api-exercise/exercise/homework/student/details/getStudentDetailsList',
      method: 'get',
      isParams: true,
      data,
    })
  },
  submit(data) {
    return http({
      url: '/api-exercise/exercise/homework/student/details/submit/feedback',
      method: 'post',
      data,
    })
  },
}

export default homeworkApi
