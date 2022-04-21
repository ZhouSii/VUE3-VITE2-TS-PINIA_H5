<!--
 * @Descripttion: 作业-多试卷列表
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 10:30:52
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:26:41
-->
<template>
  <div class="HomeworkList folder">
    <CommonHeader class="folder-tool">
      <template #left> <Back /> </template>
      <span>试卷列表</span>
    </CommonHeader>
    <div class="folder-content">
      <div class="subject-list">
        <div class="list-header">
          <div>
            <img
              class="subject_icon"
              :src="
                'http://edu.jiuweiedu.com:81/images/exam/icon_cuotiku_' +
                subjectBg[topic.subjectName] +
                '.png'
              "
              alt=""
            />
            {{ topic.subjectName }}
            <span>截止日期:{{ topic.stopTime }}</span>
          </div>
        </div>
        <div class="list-content">
          <ul>
            <li v-for="item in topic.papers" :key="item.id">
              <span class="subject-title">
                {{ item.paperName }}
                <span :class="[item.status == 3 ? 'complete' : '']">{{
                  stateTips[item.status]
                }}</span>
              </span>
              <div class="btns">
                <span class="default" @click.stop="download(item)">下载</span>
                <span v-if="item.studentType == 1" class="default" @click.stop="downloadDtk(item)"
                  >答题卡</span
                >
                <span v-if="item.status == 1" class="default" @click.stop="onClickFeedback(item)"
                  >错题反馈</span
                >
                <span v-if="item.status == 2" class="default" @click.stop="toPhoto(item, 1)"
                  >拍照上传</span
                >
                <span v-if="item.status == 0" class="primary" @click.stop="submit(item)"
                  >提交作业</span
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Popup v-model:showPop="showPop" @emit-parent="emitParent" />
  </div>
</template>

<script lang="ts">
export default { name: 'HomeworkList' }
</script>
<script setup lang="ts">
import CommonHeader from '../components/header.vue'
import homeworkApi from '@/service/api/homework'
import useRouter from '@/hooks/useRouter'
import hooksFunc from '@/hooks/useVant'
import * as DownLoad from '@/utils/downLoad'
import { Toast, Notify } from 'vant'
import { ObjTy } from '~/common'
import Popup from '../components/popup.vue'

// 背景图片
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

// 状态
const stateTips = ref({
  0: '未提交',
  1: '未反馈',
  2: '已反馈未提交',
  3: '已完成',
  4: '已补交',
})

interface DataProps {
  topic: ObjTy
  showPop: boolean
}

const state: DataProps = reactive({
  topic: {},
  showPop: false,
})

const curData = ref({})

state.topic = JSON.parse(sessionStorage.getItem('homeworkList') || '')

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
      return hooksFunc.vantToastMixin('下载失败，请稍后再试~~', 'fail')
    })
}

// 下载答题卡
const downloadDtk = async (data: any): Promise<void> => {
  const { datas } = await homeworkApi.downloadDtk({
    homeworkId: state.topic.homeworkId,
    studentId: state.topic.studentId,
    paperId: data.paperId,
  })
  DownLoad.blobDownloadFile(datas, 'application/pdf', state.topic.homeworkName)
}

// 错题反馈
const onClickFeedback = (data: ObjTy): void => {
  useRouter.routerPushMixin('HomeworkFeedback', {
    homeworkId: state.topic.homeworkId,
    homeworkName: state.topic.homeworkName,
    paperId: data.paperId,
    studentId: state.topic.studentId,
    studentName: state.topic.studentName,
    classId: state.topic.classId,
    className: state.topic.className,
  })
}

// 提交作业
const submit = (data: ObjTy): void => {
  const needTips = localStorage.getItem('needTips')
  if (needTips == 'true') {
    toPhoto(data)
  } else {
    curData.value = data
    state.showPop = true
  }
}

const emitParent = (data: any) => {
  localStorage.setItem('needTips', JSON.stringify(data.needTips))
  toPhoto(curData)
}

// 提交作业
const toPhoto = (data: ObjTy, type?: number) => {
  useRouter.routerPushMixin('HomeworkPhoto', {
    homeworkId: state.topic.homeworkId,
    homeworkName: state.topic.homeworkName,
    paperId: data.paperId,
    studentId: state.topic.studentId,
    studentName: state.topic.studentName,
    classId: state.topic.classId,
    className: state.topic.className,
    type,
  })
}

// 使用toRefs解构
const { topic, showPop } = toRefs(state)
</script>

<style lang="scss" scoped>
.HomeworkList {
  background: rgba(239, 243, 247, 1);
  padding-top: 10px;
  .folder-content {
    flex: 1;
    overflow-x: hidden;
    padding: 10px 15px 0;
    .subject-list {
      background: #ffffff;
      border-radius: 15px 15px 15px 15px;
      padding: 14px 15px 10px 40px;
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
        ul {
          margin-bottom: 10px;
          li {
            height: 50px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .subject-title {
              font-size: 14px;
              font-family: PingFang SC-Regular, PingFang SC;
              font-weight: 400;
              color: #000000;
              line-height: 16px;
              span {
                display: inline-block;
                font-size: 12px;
                font-family: PingFang SC-Regular, PingFang SC;
                font-weight: 400;
                color: #ffffff;
                background: #cccccc;
                border-radius: 3px 3px 3px 3px;
                line-height: 16px;
                padding: 0 5px;
              }
              .complete {
                color: #fff;
                background: #43d0a8;
              }
            }
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
          li:not(:last-child) {
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>
