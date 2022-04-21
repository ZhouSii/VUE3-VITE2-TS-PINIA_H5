<!--
 * @Descripttion: 学生列表
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-11 11:15:49
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:36:30
-->
<template>
  <div class="dashboard folder">
    <div class="folder-tool">
      <i class="icon"></i>
      <span class="quit" @click="logout">退出</span>
    </div>
    <div class="folder-header">{{ className || '' }}</div>
    <div class="folder-content">
      <div class="student-list" v-for="(item, key) in stuList" :key="key">
        <div class="student-list-item" v-for="student in item" :key="student.studentId">
          <div class="colItem" @click="ToHomework(student)">
            <span>{{ student.studentName }}</span>
            <span>{{ student.studentNum }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useRouter from '@/hooks/useRouter'
import { ObjTy } from '~/common'
import { userStore } from '@/store/users'
import { getUserInfo } from '@/utils/auth'

interface DataProps {
  className: string
  stuList: Array<any>
}

const store = userStore()

const state: DataProps = reactive({
  className: '',
  stuList: [] as any,
})

// const clientWidth: number = document.documentElement.clientWidth

//ToExample
const ToHomework = (student: ObjTy) => {
  useRouter.routerPushMixin('Homework', student)
}

const users = getUserInfo()

state.className = users.gradeName + users.className

const studentList = users.studentJson

if (studentList.length) {
  const arrLen: number = 5 //这里一行数组最多5个
  const newDataArr = [] as any
  for (var i = 0; i < studentList.length; i += arrLen) {
    newDataArr.push(studentList.slice(i, i + arrLen))
  }
  state.stuList = newDataArr
}
// console.log('宽度', clientWidth)

const logout = async (): Promise<void> => {
  await store.FedLogOut()
  location.reload()
}

// 使用toRefs解构
const { className, stuList } = toRefs(state)
</script>

<style scoped lang="scss">
.dashboard {
  padding-top: 10px;
  .folder-tool {
    padding: 7px 14px 7px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon {
      display: inline-block;
      width: 24px;
      height: 20px;
      background: url('../../assets/icons/icon_slider.png') no-repeat center;
      background-size: contain;
    }
    .quit {
      font-size: 16px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #000000;
      line-height: 14px;
    }
  }

  .folder-header {
    font-size: 18px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 26px;
    text-align: center;
    margin-bottom: 25px;
  }
  .folder-content {
    flex: 1;
    overflow-x: hidden;
    padding: 5px 44px 20px 44px;

    :deep(.van-row) {
      &:not(:last-child) {
        margin-bottom: 23px;
      }
    }

    .student-list:not(:last-child) {
      margin-bottom: 25px;
    }

    .student-list-item {
      display: inline-block;
      width: 20%;
      &:first-child {
        padding-right: 32px;
      }
      &:nth-child(2) {
        padding-right: 24px;
        padding-left: 8px;
      }
      &:nth-child(3) {
        padding-right: 16px;
        padding-left: 16px;
      }
      &:nth-child(4) {
        padding-right: 8px;
        padding-left: 24px;
      }
      &:last-child {
        padding-left: 32px;
      }
    }
    .colItem {
      padding: 9px 15px;
      background: #f2f2f7;
      border-radius: 5px 5px 5px 5px;
      font-weight: 400;
      color: #000000;
      display: flex;
      justify-content: space-between;
      height: 32px;
      font-size: 12px;

      span + span {
        color: rgba(60, 60, 67, 0.6);
      }
    }
    .colItem-active {
      background: rgba(47, 116, 237, 1);
      color: #fff;
      span + span {
        color: #fff;
      }
    }
  }
}
</style>
