<!--
 * @Descripttion: 作业情况
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 17:25:21
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 11:05:03
-->
<template>
  <div class="homework folder">
    <CommonHeader class="folder-tool">
      <template #left> <Back /> </template>
      <template #right>
        <span class="tool-data" @click="onClickData">
          <i class="icon-data"></i>
          <span>{{ query.query.date || '全部' }}</span>
          <i class="icon-select"></i>
        </span>
      </template>
      <span>{{ title }}</span>
    </CommonHeader>
    <div class="folder-header">
      <van-tabs
        v-model:active="active"
        background="#EFF3F7"
        title-active-color="#2F74ED"
        color="#2F74ED"
        @click-tab="onClickTab"
      >
        <van-tab title="未完成"></van-tab>
        <van-tab title="已完成"></van-tab>
      </van-tabs>
    </div>
    <div class="folder-content">
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
        <van-list
          v-model:loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          @load="onLoad"
        >
          <div
            class="subject-list"
            v-for="item in list"
            :key="item.id"
            @click="onClickDetails(item)"
          >
            <div class="list-header">
              <div>
                <img
                  class="subject_icon"
                  :src="
                    'http://edu.jiuweiedu.com:81/images/exam/icon_cuotiku_' +
                    subjectBg[item.subjectName] +
                    '.png'
                  "
                  alt=""
                />
                {{ item.subjectName }}
                <span>截止日期:{{ item.stopTime }}</span>
              </div>
              <i v-if="item.type > 1" class="icon" @click.stop="onClickExplain(item)"></i>
            </div>
            <div class="list-content">
              <h4>{{ item.homeworkName }}</h4>
              <ul>
                <li v-for="tips in item.requirementsArr" :key="tips" v-html="tips"></li>
              </ul>
              <div class="list-tools">
                <!-- <span class="more">显示更多</span> -->
                <div class="btns">
                  <div v-if="!item.isMorePaper">
                    <span class="default" @click.stop="download(item)">下载</span>
                    <span
                      v-if="item.studentType == 1"
                      class="default"
                      @click.stop="downloadDtk(item)"
                      >答题卡</span
                    >
                    <span
                      v-if="item.status == 1"
                      class="default"
                      @click.stop="onClickFeedback(item)"
                      >错题反馈</span
                    >
                    <span v-if="item.status == 2" class="default" @click.stop="toPhoto(item, 1)"
                      >拍照上传</span
                    >
                    <span v-if="item.status == 0" class="primary" @click.stop="submit(item)"
                      >提交作业</span
                    >
                  </div>
                  <span v-else class="default" @click.stop="toList(item)">试卷列表</span>
                </div>
              </div>
            </div>
          </div>
        </van-list>
      </van-pull-refresh>

      <!-- <van-uploader /> -->
    </div>

    <van-calendar v-model:show="showCalendar" @confirm="onConfirm" color="#1989fa" />

    <Popup v-model:showPop="showPop" @emit-parent="emitParent" />
  </div>
</template>

<script lang="ts">
export default { name: 'Homework' }
</script>
<script setup lang="ts">
import homeworkApi from '@/service/api/homework'
import useRouter from '@/hooks/useRouter'
import CommonHeader from '../components/header.vue'
import Popup from '../components/popup.vue'
import { ListParams } from '@/service/api/homework/types'
import { getUserInfo } from '@/utils/auth'
import { Toast, Notify } from 'vant'
import { ObjTy } from '~/common'
import * as DownLoad from '@/utils/downLoad'

//背景图片
const subjectBg = ref({
  语文: 'yuwen',
  数学: 'shuxue',
  化学: 'huaxue',
  历史: 'lishi',
  生物: 'shengwu',
  物理: 'wuli',
  英语: 'yingyu',
  政治: 'zhengzhi',
  道德与法治: 'zhengzhi',
  地理: 'mengban',
})

interface DataProps {
  active: number
  showCalendar: boolean
  showPop: boolean
  loading: boolean
  finished: boolean
  refreshing: boolean
  date: string
  title: string
  query: ListParams
  list: Array<any>
}

const state: DataProps = reactive({
  active: 0,
  showCalendar: false,
  showPop: false,
  loading: false,
  finished: false,
  refreshing: false,
  date: '全部',
  title: '',
  query: {
    current: 0,
    query: {
      date: '',
      state: 0,
      studentId: '',
    },
    size: 10,
  },
  list: [] as any,
})

// 用户信息
const users = getUserInfo()
// 接收参数
const queryParams = useRouter.getQueryParam()

console.log('queryParams', queryParams)

const curData = ref({})

state.title = users.gradeName + users.className + '   ' + queryParams.studentName

state.query.query.studentId = queryParams.studentId

// 下拉刷新
const onLoad = (): void => {
  state.query.current += 1
  setTimeout(() => {
    if (state.refreshing) {
      state.refreshing = false
    }
    getList()
  }, 500)
}

// 上拉刷新
const onRefresh = (): void => {
  // 清空列表数据
  state.finished = false

  // 重新加载数据
  // 将 loading 设置为 true，表示处于加载状态
  state.loading = true
  onLoad()
}

// 获取页面列表数据
const getList = async (): Promise<void> => {
  try {
    const { datas } = await homeworkApi.list(state.query)

    state.loading = false

    if (datas.records.length) {
      state.list = state.list.concat(datas.records)
      state.list = state.list.map((item) => {
        return {
          ...item,
          requirementsArr: (item.requirements && item.requirements.split('\n')) || [],
        }
      })
      state.finished = false
    } else {
      state.finished = true
    }
  } catch (error) {
    console.log('error===error', error)
  }
}

// 切换 tab
const onClickTab = ({ name }): void => {
  if (state.query.query.state !== name) {
    state.query.query.state = name
    state.query.current = 0
    state.list = []
    onRefresh()
  }
}

// 跳转列表
const toList = (data: any): void => {
  useRouter.routerPushMixin('HomeworkList')
  sessionStorage.setItem('homeworkList', JSON.stringify(data))
}
// 试卷讲解
const onClickExplain = (data: ObjTy): void => {
  useRouter.routerPushMixin('HomeworkExplain', { homeworkId: data.homeworkId })
}

// 点击查看详情
const onClickDetails = (data: ObjTy): void => {
  if (state.query.query.state == 1 && data.type > 1) {
    sessionStorage.setItem('imgUrls', JSON.stringify(data.imageContent))

    useRouter.routerPushMixin('HomeworkDetails', {
      homeworkId: data.homeworkId,
      paperId: data.paperId,
      studentId: data.studentId,
      homeworkName: data.homeworkName,
      finishTime: data.finishTime,
    })
  }
}

// 提交作业
const submit = (data: ObjTy): void => {
  const needTips = localStorage.getItem('needTips')
  console.log('needTips', needTips)
  if (needTips == 'true') {
    toPhoto(data)
  } else {
    curData.value = data
    state.showPop = true
  }
}

const emitParent = (data: any) => {
  console.log('得到子组件的信息111', data.needTips)
  localStorage.setItem('needTips', JSON.stringify(data.needTips))
  toPhoto(curData)
}

// 提交作业
const toPhoto = (data: ObjTy, type?: number) => {
  useRouter.routerPushMixin('HomeworkPhoto', {
    homeworkId: data.homeworkId,
    homeworkName: data.homeworkName,
    paperId: data.paperId,
    studentId: data.studentId,
    studentName: data.studentName,
    classId: data.classId,
    className: data.className,
    type,
  })
}

// 错题反馈
const onClickFeedback = (data: ObjTy): void => {
  useRouter.routerPushMixin('HomeworkFeedback', {
    homeworkId: data.homeworkId,
    homeworkName: data.homeworkName,
    paperId: data.paperId,
    studentId: data.studentId,
    studentName: data.studentName,
    classId: data.classId,
    className: data.className,
  })
}

// 时间选项
const onClickData = (): void => {
  state.showCalendar = true
}

// 时间 formatDate
const formatDate = (date: {
  getFullYear: () => number
  getMonth: () => number
  getDate: () => any
}) => `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`

const onConfirm = (value: any) => {
  state.showCalendar = false
  state.query.query.date = formatDate(value)
  onRefresh()
}

// 下载
const download = (data: any): void => {
  const loading = Toast.loading({
    message: '下载中...',
    forbidClick: true,
    loadingType: 'spinner',
  })

  const nameList = data.contentUrl.split('=').pop().split('.')

  DownLoad.singleFile(data.contentUrl, nameList[0])
    .then(() => {
      loading.close()
      Notify({ type: 'success', message: '下载成功!' })
    })
    .catch(() => {
      loading.close()
      Toast({
        message: '下载失败，请稍后再试~~',
        position: 'top',
      })
    })
}

// 下载答题卡
const downloadDtk = async (data: any): Promise<void> => {
  const { datas } = await homeworkApi.downloadDtk({
    homeworkId: data.homeworkId,
    studentId: data.studentId,
    paperId: data.paperId,
  })
  DownLoad.blobDownloadFile(datas, 'application/pdf', data.homeworkName)
}

// 使用toRefs解构
const { active, showCalendar, showPop, query, title, loading, finished, refreshing, list } =
  toRefs(state)
</script>

<style lang="scss" scoped>
.homework {
  background: rgba(239, 243, 247, 1);
  padding-top: 10px;
  .folder-tool {
    .tool-data {
      display: flex;
      align-items: center;
      span {
        font-size: 12px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #272727;
        line-height: 20px;
        margin: 0 5px;
      }
      .icon-data {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/icons/icon_date.png') no-repeat center;
        background-size: contain;
      }
      .icon-select {
        display: inline-block;
        width: 20px;
        height: 20px;
        background: url('../../assets/icons/btn_arrow_xiala.png') no-repeat center;
        background-size: contain;
      }
    }
  }

  .folder-content {
    flex: 1;
    overflow-x: hidden;
    padding: 10px 15px 0;
    .subject-list {
      background: #ffffff;
      border-radius: 15px 15px 15px 15px;
      padding: 14px 15px 10px 40px;

      &:not(:last-child) {
        margin-bottom: 10px;
      }
      .list-header {
        font-size: 16px;
        font-family: PingFang SC-Medium, PingFang SC;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 10px;

        div {
          color: #000000;
          font-weight: 550;
          line-height: 18px;
          position: relative;
          .subject_icon {
            display: inline-block;
            width: 28px;
            height: 28px;
            position: absolute;
            top: -4px;
            left: -34px;
          }
        }
        span {
          font-size: 12px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 400;
          color: #b3b3b3;
          line-height: 10px;
          margin-left: 5px;
        }
        .icon {
          display: inline-block;
          width: 56px;
          height: 30px;
          background: url('../../assets/pic_jiangjie.png') no-repeat center;
          background-size: contain;
        }
      }
      .list-content {
        h4 {
          font-size: 14px;
          font-family: PingFang SC-Regular, PingFang SC;
          font-weight: 500;
          color: #000000;
          line-height: 15px;
          margin-bottom: 20px;
        }
        ul {
          margin-bottom: 10px;
          li {
            font-size: 12px;
            font-family: PingFang SC-Regular, PingFang SC;
            font-weight: 400;
            color: #808080;
            line-height: 16px;
          }
          li:not(:last-child) {
            margin-bottom: 10px;
          }
        }
        .list-tools {
          display: flex;
          justify-content: end;
          align-items: center;
          // .more {
          //   font-size: 12px;
          //   font-family: PingFang SC-Regular, PingFang SC;
          //   font-weight: 400;
          //   color: #2f74ed;
          //   line-height: 10px;
          // }
          .btns {
            span {
              display: inline-block;
              border-radius: 20px 20px 20px 20px;
              line-height: 28px;
              padding: 0 15px;
              font-size: 12px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #000000;
              border: 1px solid #b3b3b3;
              &:not(:last-child) {
                margin-right: 8px;
              }
            }
            .primary {
              color: #2f74ed;
              border-color: #2f74ed;
            }
          }
        }
      }
    }
  }
}
</style>
