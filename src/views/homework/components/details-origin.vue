<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 15:10:57
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-19 14:38:24
-->
<template>
  <div class="details-origin">
    <ul ref="printDom" class="preview-group">
      <li v-for="(src, idx) in urls" :key="src" @click="onPreview(idx)">
        <AuthImg :auth-src="src" @getUrl="getUrl" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ImagePreview } from 'vant'
import AuthImg from '@/components/AuthImg/index.vue'

const urls = JSON.parse(sessionStorage.getItem('imgUrls') || '')?.split(',')

const urlList = [] as any

const getUrl = (url: string): void => {
  urlList.push(url)
}

const onPreview = (index: number): void => {
  ImagePreview({
    images: urlList,
    startPosition: index,
  })
}
</script>

<style lang="scss" scoped>
.details-origin {
  height: 100%;
  background: #ffffff;
  border-radius: 8px 8px 8px 8px;
  padding: 15px;
  :deep(.van-row) {
    height: 100%;
  }

  .preview-group {
    // padding: 10px;
    // margin-top: 10px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 100%;
    overflow: auto;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    border: 0 none;
    li {
      margin-right: 10px;
      height: 100%;
      -webkit-box-flex: 0;
      text-align: center;
      overflow: hidden;
      flex: 0 0 calc(50% - 25px);
      img {
        max-width: 100%;
        max-height: 100%;
        border: 1px solid #ddd;
      }
    }
  }
}
</style>
