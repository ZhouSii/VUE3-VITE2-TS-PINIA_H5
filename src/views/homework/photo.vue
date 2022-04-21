<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-20 11:36:01
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:09:51
-->
<template>
  <div class="HomeworkPhoto folder">
    <CommonHeader class="folder-tool">
      <template #left> <Back /> </template>
      <template #right>
        <span class="tool-next" @click="onClick">{{ type == 1 ? '提 交' : '下一步' }} </span>
      </template>
      <span class="tool-title">照片上传</span>
    </CommonHeader>
    <div class="folder-content">
      <van-uploader
        v-model="imgFormData"
        preview-size="100"
        multiple
        :max-size="10 * 1024 * 1024"
        @oversize="onOversize"
        :after-read="afterRead"
      />
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'HomeworkPhoto' }
</script>

<script setup lang="ts">
import commonApi from '@/service/api/common'
import homeworkApi from '@/service/api/homework'
import useRouter from '@/hooks/useRouter'
import hooksFunc from '@/hooks/useVant'
import CommonHeader from '../components/header.vue'
import { Toast } from 'vant'

// 接收参数
const queryParams = useRouter.getQueryParam()

const type = queryParams.type || 0

const imgFormData = ref([] as any)

const onOversize = () => {
  return Toast('图片大于10M，为保证您的资料提交成功，请重新选择图片')
}
const afterRead = (file: any): void => {
  console.log('file, detail', file)
  console.log('file instanceof Array', file instanceof Array)

  file.status = 'uploading'
  file.message = '上传中...'

  if (file instanceof Array) {
    file.map((v) => {
      uploadImg(v)
    })
  } else {
    uploadImg(file)
  }
}

const uploadImg = (file) => {
  commonApi
    .uploadFile({
      file: file.file,
    })
    .then((res) => {
      const { datas, resp_code } = res
      if (resp_code === 0) {
        file.path = datas.path
        file.message = ''
        file.status = 'done'
      } else {
        file.status = 'failed'
        file.message = '上传失败'
      }
    })
    .catch((err) => {
      file.status = 'failed'
      file.message = '上传失败'
    })
}

const onClick = async (): Promise<void> => {
  const url = imgFormData.value.map((item: { path: any }) => item.path).join(',')

  if (!url.length) {
    return hooksFunc.vantToastMixin('请上传图片！', 'fail')
  }

  const params = {
    homeworkId: queryParams.homeworkId,
    paperId: queryParams.paperId,
    studentId: queryParams.studentId,
    url,
  }
  await homeworkApi.upload(params)

  if (type == 1) {
    useRouter.routerBackMixin()
  } else {
    useRouter.routerPushMixin('HomeworkFeedback', { ...queryParams })
  }
}
</script>

<style lang="scss" scoped>
.HomeworkPhoto {
  background: rgba(239, 243, 247, 1);
  padding-top: 10px;
  .tool-next {
    color: #007aff;
    font-size: 16px;
  }
  .folder-content {
    flex: 1;
    overflow-x: hidden;
    margin: 10px 15px 15px;
    background: #ffffff;
    border-radius: 8px 8px 8px 8px;
    padding: 15px;
  }
}
</style>
