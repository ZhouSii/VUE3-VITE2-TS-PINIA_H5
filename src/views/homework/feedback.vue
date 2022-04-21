<!--
 * @Descripttion: 错题反馈
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-20 15:56:13
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-21 10:10:51
-->
<template>
  <div class="HomeworkFeedback folder">
    <CommonHeader class="folder-tool">
      <template #left> <Back /> </template>
      <template #right>
        <!-- <span class="tool-next" @click="onClick">下一步</span> -->
      </template>
      <span class="tool-title">{{ queryParams.homeworkName }}</span>
    </CommonHeader>
    <div class="feedback-title">
      <span class="th">题号</span>
      <van-tabs class="topic-list" v-model:active="active" color="#fff" @click-tab="onClickTab">
        <van-tab v-for="item in feedbackList" :key="item.id">
          <template #title>
            <span>{{ item.bigQid }}{{ item.qid ? '.' + item.qid : '' }}</span>
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
      </div>
    </div>
    <div class="feedback-situation">
      <div class="topic-title">作答情况</div>
      <div class="situation-content">
        <van-row gutter="10">
          <van-col
            span="6"
            v-for="(item, idx) in situationOptions"
            :key="item"
            @click="onClickItem(idx)"
          >
            <span class="situation-item" :class="{ 'active-item': idx + 1 === topicInfo.ans }">{{
              item
            }}</span>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="folder-footer">
      <van-row gutter="20" v-if="showLeft">
        <van-col span="12">
          <van-button type="default" :disabled="active === 0" block @click="onClick('last')"
            >上一题</van-button
          ></van-col
        >
        <van-col span="12" v-if="showRight">
          <van-button type="primary" block @click="onClick('next')">
            {{ active !== feedbackList.length - 1 ? '下一题' : '提 交' }}
          </van-button></van-col
        >
      </van-row>
    </div>
  </div>
</template>

<script lang="ts">
export default { name: 'HomeworkFeedback' }
</script>

<script setup lang="ts">
import useRouter from '@/hooks/useRouter'
import CommonHeader from '../components/header.vue'
import homeworkApi from '@/service/api/homework'
import { disposeTm } from '@/utils/'
import { ObjTy } from '~/common'
import { Dialog, Toast } from 'vant'

// 接收参数
const queryParams = useRouter.getQueryParam()

const situationOptions = ['A.概念混淆', 'B.未掌握', 'C.知识遗漏', 'D.思路不对']

const active = ref(0)

const feedbackList = ref([] as any)

const topicInfo: ObjTy = ref({})

const init = async (): Promise<void> => {
  const { resp_code, datas, resp_msg } = await homeworkApi.detailsList({
    homeworkId: queryParams.homeworkId,
    studentId: queryParams.studentId,
    paperId: queryParams.paperId,
  })

  if (resp_code === 0) {
    feedbackList.value = datas.map((item) => {
      return {
        ...item,
        ans: 0,
      }
    })
    topicInfo.value = disposeTm(feedbackList.value[0])
  } else {
    Toast({
      message: resp_msg,
      position: 'top',
    })
  }
}

const showLeft = computed(() => feedbackList.value.length > 1)
const showRight = computed(() => feedbackList.value.length > 2)

const onClickTab = ({ name }): void => {
  topicInfo.value = disposeTm(feedbackList.value[name])
}

const onClickItem = (index: number): void => {
  topicInfo.value.ans = index + 1
  feedbackList.value[active.value].ans = index + 1
}

// 切换题目
const onClick = (type: string): Promise<void> | void => {
  if (feedbackList.value.length - 1 === active.value) {
    return Dialog.confirm({
      title: '提示',
      message: '提交后就不可以修改了, 是否提交?',
      className: 'submit-dialog',
      confirmButtonText: '好的，提交',
      confirmButtonColor: '#2F74ED',
      cancelButtonText: '先不提交',
    })
      .then(() => {
        submit()
      })
      .catch(() => {
        // on cancel
      })
  }

  if (type === 'next') {
    active.value++
  } else {
    active.value--
  }
  topicInfo.value = disposeTm(feedbackList.value[active.value])
}

const submit = async (): Promise<void> => {
  const qModel = {
    homeworkId: queryParams.homeworkId,
    homeworkName: queryParams.homeworkName,
    studentId: queryParams.studentId,
    studentName: queryParams.studentName,
    classId: queryParams.classId,
    className: queryParams.className,
    paperId: queryParams.paperId,
  }

  const submitList = feedbackList.value.map((item: ObjTy) => {
    return {
      ...qModel,
      qid: (item.bigQid ? item.bigQid + '.' : '') + item.qid,
      questionId: item.id,
      parentId: item.parentId,
      textBookId: item.textbookId,
      questionTypeId: item.questionTypeId,
      isSelectType: item.isSelectType,
      easyId: item.questionDifficultId,
      knowledgeIds: item.nodeList
        .map((item: { id: any }) => {
          return item.id
        })
        .join(','),
      bookNodeId: item.bookNodeId,
      versionId: item.versionId,
      sorting: item.sorting,
      studentAnswer: item.ans,
    }
  })

  await homeworkApi.submit(submitList)

  useRouter.routerPushMixin('Homework')
}

init()
</script>

<style lang="scss" scoped>
.HomeworkFeedback {
  background: rgba(239, 243, 247, 1);
  padding-top: 10px;
  .tool-next {
    color: #007aff;
    font-size: 16px;
  }
  .feedback-title {
    display: flex;
    align-items: center;
    // margin-bottom: 15px;
    padding: 10px 15px 0;
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
        background: #2f74ed;
        color: #fff;
        border-radius: 4px;
        max-width: 80px;
      }
      .van-tab:not(:last-child) {
        margin-right: 8px;
      }
    }
  }

  .topic-title {
    font-size: 14px;
    font-family: PingFang SC-Medium, PingFang SC;
    font-weight: 550;
    color: #262626;
    line-height: 15px;
    margin-bottom: 13px;
  }

  .feedback-content {
    flex: 1;
    overflow-x: hidden;
    margin: 10px 15px 10px;
    background: #ffffff;
    border-radius: 8px 8px 8px 8px;
    padding: 15px;

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
  .feedback-situation {
    margin: 0px 15px 10px;
    background: #ffffff;
    border-radius: 8px 8px 8px 8px;
    padding: 15px;
    .situation-item {
      width: 100%;
      display: inline-block;
      background: #f5f5f5;
      border-radius: 8px 8px 8px 8px;
      border: 1px solid #f5f5f5;
      line-height: 30px;
      text-align: center;
      font-weight: 400;
      font-size: 12px;
      color: #999999;
    }

    .active-item {
      background: rgba(47, 116, 237, 0.1);
      border-radius: 8px 8px 8px 8px;
      border: 1px solid rgba(47, 116, 237, 0.4);
      color: #2f74ed;
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

<style>
.submit-dialog .van-dialog__header {
  font-size: 16px;
  font-weight: 550;
  color: #000000;
  margin-bottom: 10px;
}
</style>
