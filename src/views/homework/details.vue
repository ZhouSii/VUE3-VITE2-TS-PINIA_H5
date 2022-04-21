<!--
 * @Descripttion: 查看详情
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 14:48:21
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 18:22:30
-->
<template>
  <div class="HomeworkDetails folder">
    <CommonHeader class="folder-tool">
      <template #left> <Back /> </template>
      <div class="tool-header">
        <span>{{ title }}</span>
        <span>{{ finishTime }}</span>
      </div>
    </CommonHeader>
    <div class="folder-header">
      <van-tabs
        v-model:active="active"
        background="#EFF3F7"
        title-active-color="#2F74ED"
        color="#2F74ED"
        @click-tab="onClickTab"
      >
        <van-tab title="作业原卷"></van-tab>
        <van-tab title="反馈详情"></van-tab>
      </van-tabs>
    </div>
    <div class="folder-content">
      <component :is="flag ? Origin : Feedback"></component>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'HomeworkDetails' }
</script>

<script setup lang="ts">
import useRouter from '@/hooks/useRouter'

import CommonHeader from '../components/header.vue'
import Origin from './components/details-origin.vue'
import Feedback from './components/details-feedback.vue'


interface DataProps {
  active: number
  flag: boolean
  title: string
  finishTime: string
}

const state: DataProps = reactive({
  active: 0,
  flag: true,
  title: '',
  finishTime: '',
})

// 接收参数
const queryParams = useRouter.getQueryParam()

state.title = queryParams.homeworkName
state.finishTime = queryParams.finishTime

const onClickTab = ({ name }): void => {
  state.flag = name == 0 ? true : false
}

// 使用toRefs解构
const { active, flag, title, finishTime } = toRefs(state)
</script>

<style lang="scss" scoped>
.HomeworkDetails {
  background: rgba(239, 243, 247, 1);
  padding-top: 10px;
  .tool-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    span + span {
      font-size: 12px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #676767;
      line-height: 16px;
    }
  }

  .folder-content {
    flex: 1;
    overflow-x: hidden;
    // padding: 10px 15px 0;
    margin: 10px 15px;
    // background: #ffffff;
    // border-radius: 8px 8px 8px 8px;
    // padding: 15px;
  }
}
</style>
