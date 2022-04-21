<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 15:15:56
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 18:22:45
-->
<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 15:10:57
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-13 15:11:02
-->
<template>
  <div class="details-feedback">
    <div class="feedback-title">
      <span class="th">题号</span>
      <van-tabs class="topic-list" v-model:active="active" color="#fff" @click-tab="onClickTab">
        <van-tab
          v-for="item in feedbackList"
          :title-class="item.studentAnswer != 0 ? 'wrong' : ''"
          :key="item.id"
        >
          <template #title>
            <span>{{ item.qid }}</span>
          </template>
        </van-tab>
      </van-tabs>
    </div>
    <div class="feedback-content">
      <div class="topic-title">题目解析</div>
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
            style="color: #2f74ed"
            v-html="topicInfo.answer"
          ></span>
        </div>
        <div class="topic-answer-item">
          <span class="topic-answer-title">解析：</span>
          <div class="topic-answer-content" v-html="topicInfo.analysis"></div>
        </div>
        <div class="topic-answer-item" v-if="studentAnswerString">
          <span class="topic-answer-title">详解：</span>
          <span class="topic-answer-content" v-html="studentAnswerString"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import homeworkApi from '@/service/api/homework'
import useRouter from '@/hooks/useRouter'
import { disposeTm } from '@/utils/'
import { ObjTy } from '~/common'

const active = ref(0)

const studentAnswerString = ref('')

// 接收参数
const queryParams = useRouter.getQueryParam()

const feedbackList = ref([] as any)

const topicInfo: ObjTy = ref({})

const init = async (): Promise<void> => {
  const { datas } = await homeworkApi.details({
    homeworkId: queryParams.homeworkId,
    studentId: queryParams.studentId,
    paperId: queryParams.paperId,
  })

  feedbackList.value = datas
  topicInfo.value = disposeTm(datas[0].questionInfo)
  studentAnswerString.value = datas[0].studentAnswer !== 0 ? datas[0].studentAnswerString : ''
}

const onClickTab = ({ name }) => {
  topicInfo.value = disposeTm(feedbackList.value[name].questionInfo)
  studentAnswerString.value =
    feedbackList.value[name].studentAnswer !== 0 ? feedbackList.value[name].studentAnswerString : ''
}

init()
</script>

<style lang="scss" scoped>
.details-feedback {
  height: 100%;
  display: flex;
  flex-direction: column;
  .feedback-title {
    display: flex;
    align-items: center;
    // margin-bottom: 15px;

    .th {
      font-size: 14px;
      font-weight: 550;
      color: #262626;
    }

    .topic-list {
      flex: 1;
      overflow-x: scroll;
    }

    :deep(.van-tabs__wrap) {
      height: 30px;
      line-height: 30px;
    }
    :deep(.van-tabs__nav) {
      background: #eff3f7;
      .van-tab {
        background: #07c076;
        color: #fff;
        border-radius: 4px;
      }

      .wrong {
        background: #fc5d5d;
        color: #fff;
      }
      .van-tab:not(:last-child) {
        margin-right: 8px;
      }
    }
  }

  .feedback-content {
    background: #ffffff;
    border-radius: 8px 8px 8px 8px;
    padding: 15px;
    flex: 1;
    overflow: auto;
    .topic-title {
      font-size: 14px;
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
}
</style>
