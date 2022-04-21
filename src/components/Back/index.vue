<!--
 * @Descripttion: 返回组件
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 10:40:31
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-13 10:48:28
-->
<template>
  <div class="back-icon" @click="goBack">
    <van-icon name="arrow-left" />
    <span> 返回</span>
  </div>
</template>

<script lang="ts">
export default { name: 'Back' }
</script>
<script setup lang="ts">
import useRouter from '@/hooks/useRouter'

const goBack = (): void => {
  useRouter.routerBackMixin()
}
</script>

<style lang="scss" scoped>
.back-icon {
  color: #007aff;
  font-size: 16px;
  display: flex;
  align-items: center;
}
</style>
