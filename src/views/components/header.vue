<!--
 * @Descripttion: 公共头部
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 11:42:05
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-13 14:11:38
-->
<template>
  <div class="common-header">
    <div class="header-left"><slot name="left"></slot></div>
    <div class="header-content"><slot></slot></div>
    <div class="header-right"><slot name="right"></slot></div>
  </div>
</template>

<style lang="scss" scoped>
.common-header {
  padding: 10px 15px;
  overflow: hidden;
  position: relative;
  .header-left {
    position: absolute;
    top: 50%;
    left: 15px;
    transform: translateY(-50%);
  }
  .header-content {
    font-size: 16px;
    font-family: PingFang SC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    line-height: 14px;
    text-align: center;
  }
  .header-right {
    position: absolute;
    top: 50%;
    right: 15px;
    transform: translateY(-50%);
  }
}
</style>
