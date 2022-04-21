<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-12 11:43:17
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:50:18
-->
<template>
  <div class="login folder">
    <img src="../../assets/login.png" alt="" />
    <div class="folder-content">
      <van-field v-model="loginInfo.username" placeholder="请输入班级账号" label="">
        <template #left-icon>
          <i class="icon icon-account"></i>
        </template>
      </van-field>

      <van-field
        class="vanField"
        v-model="loginInfo.password"
        :type="isView ? 'text' : 'password'"
        placeholder="请输入密码"
        label=""
      >
        <template #left-icon>
          <i class="icon icon-password"></i>
        </template>
        <template #right-icon>
          <i class="icon" :class="[isView ? 'icon-hidden' : 'icon-view']" @click="viewPwd"></i>
        </template>
      </van-field>
      <div class="btn">
        <van-button type="primary" class="br-22" color="#2F74ED" block @click="next">{{
          btnTitle
        }}</van-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'Login' }
</script>
<script setup lang="ts">
import md5 from 'js-md5'
import useRouter from '@/hooks/useRouter'
import { userStore } from '@/store/users'
import hooksFunc from '@/hooks/useVant'
import { ILoginParams } from '@/service/api/login/types'

interface DataProps {
  btnTitle: string
  isView: boolean
  loginInfo: ILoginParams
}
const state: DataProps = reactive({
  btnTitle: '登录',
  isView: false,
  loginInfo: {
    grant_type: 'ipad_password',
    username: 'DLYZ21220200402',
    password: 'abc123456',
  },
})
// 使用toRefs解构
const { loginInfo, btnTitle, isView } = toRefs(state)

const users = userStore()

// 声明method方法
const next = async (): Promise<void> => {
  if (!state.loginInfo.username) {
    return hooksFunc.vantToastMixin('请输入账号！', 'fail')
  } else if (!state.loginInfo.password) {
    return hooksFunc.vantToastMixin('请输入密码', 'fail')
  } else {
    const params = {
      ...state.loginInfo,
      password: md5(state.loginInfo.password),
    }

    await users.LOGIN(params)
    await users.GetUserInfo()
    useRouter.routerPushMixin('Dashboard')
  }
}

const viewPwd = (): void => {
  console.log('viewPwd')
  state.isView = !state.isView
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 100px;
  img {
    width: 232px;
    height: 76px;
  }
  .folder-content {
    padding-top: 15px;
    width: 310px;
    :deep(.van-cell) {
      background: #f5f6f7;
      border-radius: 5px 5px 5px 5px;
      &:not(:last-child) {
        margin-bottom: 10px;
      }
      .van-field__body {
        height: 100%;
      }
    }
    .icon {
      display: inline-block;
      width: 16px;
      height: 16px;
      margin-right: 4px;
    }
    .icon-account {
      background: url('../../assets/icons/icon_account@2x.png') no-repeat center;
      background-size: contain;
    }
    .icon-password {
      background: url('../../assets/icons/icon_pwd@2x.png') no-repeat center;
      background-size: contain;
    }
    .icon-hidden {
      background: url('../../assets/icons/btn_hide.png') no-repeat center;
      background-size: contain;
      margin-right: 0;
    }
    .icon-view {
      background: url('../../assets/icons/btn_show.png') no-repeat center;
      background-size: contain;
      margin-right: 0;
    }
    .btn {
      margin-top: 25px;
    }
  }
}
</style>
