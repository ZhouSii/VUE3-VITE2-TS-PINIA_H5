<!--
 * @Descripttion: 作业-试题讲解
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 14:13:43
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 18:28:10
-->
<template>
  <div class="HomeworkExplain folder">
    <CommonHeader class="folder-tool">
      <template #left> <Back /> </template>
      <span class="tool-title">经典试题讲解</span>
    </CommonHeader>
    <div class="folder-content">
      <div class="topic-title">
        第{{ NumToChinese(curIndex + 1) }}题({{ curIndex + 1 }}/{{ topicLen }})
      </div>
      <div class="topic-content">
        <div class="topic-info-title" v-html="topicInfo.tm"></div>
        <div class="topic-info-content" v-for="(el, idx) in topicInfo.optionsArr" :key="idx">
          <div v-html="el.title" style="margin-bottom: 10px"></div>
          <div class="subjectOptionsItem" v-for="(item, key) in el.option" :key="key">
            <div v-if="item.xh">
              <span class="optionsKye">{{ item.xh }}.</span>
              <div v-html="item.content"></div>
            </div>
            <div v-else>
              <span class="optionsKye">{{ key }}.</span>
              <div v-html="item"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="topic-answer">
        <div class="topic-answer-item">
          <span class="topic-answer-title">答案：</span>
          <span
            class="topic-answer-content"
            style="color: #2f74ed; font-weight: 800"
            v-html="topicInfo.answer"
          ></span>
        </div>
        <div class="topic-answer-item">
          <span class="topic-answer-title">分析：</span>
          <div class="topic-answer-content" v-html="topicInfo.analysis"></div>
        </div>
        <div class="topic-answer-item">
          <span class="topic-answer-title">详解：</span>
          <span class="topic-answer-content" v-html="topicInfo.explain"></span>
        </div>
        <div class="topic-answer-item">
          <span class="topic-answer-title">视频解析：</span>
          <div class="topic-answer-content">
            <video
              :src="topicInfo.uploadUrl"
              :controls="true"
              class="video-js vjs-big-play-centered vjs-fluid"
              webkit-playsinline="true"
              playsinline="true"
              x-webkit-airplay="allow"
              x5-playsinline
              style="width: 100%"
              height="300"
              :autoplay="true"
              ref="video"
            ></video>
          </div>
        </div>
      </div>
    </div>
    <div class="folder-footer">
      <van-row gutter="20">
        <van-col span="12" v-if="showLeft">
          <van-button type="default" :disabled="curIndex !== 0" block @click="onClick('last')"
            >上一题</van-button
          ></van-col
        >
        <van-col span="12" v-if="showRight">
          <van-button type="primary" block @click="onClick('next')">下一题</van-button></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'HomeworkExplain' }
</script>
<script setup lang="ts">
import CommonHeader from '../components/header.vue'
import useRouter from '@/hooks/useRouter'
import homeworkApi from '@/service/api/homework'
import { ObjTy } from '~/common'
import { disposeTm } from '@/utils/'
interface DataProps {
  list: Array<any>
  curIndex: number
  topicLen: number
  topicInfo: ObjTy
}

const state: DataProps = reactive({
  list: [] as any,
  curIndex: 0,
  topicLen: 0,
  topicInfo: {},
})

//数字转中文
const NumToChinese = (num: any): string => {
  if (!/^\d*(\.\d*)?$/.test(num)) {
    alert('Number is wrong!')
    return 'Number is wrong!'
  }
  var AA = new Array('零', '一', '二', '三', '四', '五', '六', '七', '八', '九')
  var BB = new Array('', '十', '百', '千', '万', '亿', '点', '')
  var a: any = ('' + num).replace(/(^0*)/g, '').split('.'),
    k = 0,
    re = ''
  for (var i: number = a[0].length - 1; i >= 0; i--) {
    switch (k) {
      case 0:
        re = BB[7] + re
        break
      case 4:
        if (!new RegExp('0{4}\\d{' + (a[0].length - i - 1) + '}$').test(a[0])) re = BB[4] + re
        break
      case 8:
        re = BB[5] + re
        BB[7] = BB[5]
        k = 0
        break
    }
    if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re
    if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re
    k++
  }
  if (a.length > 1) {
    //加上小数部分(如果有小数部分)
    re += BB[6]
    for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)]
  }
  return re.replace('一十', '十')
}

// 接收参数
const queryParams = useRouter.getQueryParam()

const init = async (): Promise<void> => {
  const { datas } = await homeworkApi.explain({
    homeworkId: queryParams.homeworkId,
  })

  state.list = datas
  state.topicLen = datas && datas.length
  state.topicInfo = disposeTm(datas[0])
}

init()

// 切换题目
const onClick = (type: string): void => {
  if (type === 'next') {
    state.curIndex++
  } else {
    state.curIndex--
  }
  state.topicInfo = disposeTm(state.list[state.curIndex])
}

const showLeft = computed(() => state.list.length > 1)
const showRight = computed(() => state.list.length > 2 && state.curIndex !== state.list.length - 1)

// 使用toRefs解构
const { topicLen, topicInfo, curIndex } = toRefs(state)
</script>

<style lang="scss" scoped>
.HomeworkExplain {
  background: rgba(239, 243, 247, 1);
  padding-top: 10px;
  .folder-tool {
    .icon {
      display: inline-block;
      width: 24px;
      height: 20px;
      background: url('../../assets/icons/icon_slider.png') no-repeat center;
      background-size: contain;
    }
  }

  .folder-content {
    flex: 1;
    overflow-x: hidden;
    margin: 10px 15px 15px;
    background: #ffffff;
    border-radius: 8px 8px 8px 8px;
    padding: 15px;
    .topic-title {
      font-size: 16px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 550;
      color: #262626;
      line-height: 15px;
      margin-bottom: 13px;
    }
    .topic-info-title {
      font-size: 14px;
      font-family: PingFang SC-Regular, PingFang SC;
      font-weight: 400;
      color: #404040;
      line-height: 20px;
      margin-bottom: 13px;
    }

    .topic-info-content {
      margin-bottom: 40px;
      .subjectOptionsItem {
        display: flex;
        // margin-bottom: 15px;
        margin: 20px 0;
        color: #404040;
        line-height: 16px;
        .optionsKye {
          margin-right: 10px;
          font-weight: 500;
          font-size: 14px;
        }
        .optionsContent {
          font-size: 14px;
          font-weight: 400;
        }
      }
      .subjectOptionsItem > div {
        display: flex;
        align-items: center;
      }
    }

    .topic-answer {
      font-size: 14px;
      font-weight: 400;
      .topic-answer-item {
        display: flex;
        line-height: 20px;
        &:not(:last-child) {
          margin-bottom: 20px;
        }
        .topic-answer-title {
          margin-right: 5px;
          min-width: 40px;
          font-weight: 500;
          color: #262626;
        }
        .topic-answer-content {
          flex: 1;
          font-weight: 400;
          color: #808080;
        }
      }
    }
  }

  .folder-footer {
    padding: 0 15px;
    margin-bottom: 10px;
    :deep(.van-button) {
      border-radius: 28px;
    }
  }
}
</style>
