<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-19 13:54:15
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 18:25:12
-->
<template>
  <van-image width="100%" height="100%" fit="contain" :src="url" />
</template>

<script lang="ts">
export default { name: 'AuthImg' }
</script>
<script setup lang="ts">
import axios from 'axios'

import { getToken } from '@/utils/auth'

const props = defineProps({
  authSrc: {
    type: String,
    default: '',
  },
})

// 定义emit事件
const emit = defineEmits(['getUrl'])

const url = ref('')

const baseApi = import.meta.env.VITE_APP_IMAGE_URL + props.authSrc

// const baseApi = 'http://edu.jiuweiedu.com:81' + props.authSrc

const getUrl = async (): Promise<void> => {
  let token = getToken()
  // 计算运行时间开始
  // let start = new Date().getTime()
  // console.time('开始拿数据', start)
  const { data: result } = await axios.get(baseApi, {
    //设定接收类型为blob,头部什么的自行添加
    responseType: 'blob',
    headers: {
      Authorization: 'Bearer ' + token,
      // Authorization: 'Bearer ' + 'a33f7467-2f3d-42d6-9bd9-8c092dfe43da',
    },
  })
  // 计算运行时间结束
  // console.timeEnd('图片赋值', new Date().getTime() - start)
  //赋值给变量
  url.value = URL.createObjectURL(result)
  emit('getUrl', url.value)
}
getUrl()
</script>

<style lang="scss" scoped></style>
