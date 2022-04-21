<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-13 16:12:19
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-20 15:29:16
-->
<template>
  <div class="popup">
    <van-popup v-model:show="showPop" round @close="onClose">
      <img src="../../assets/pic_zuoye.png" alt="" />

      <h4>作业提交流程</h4>
      <div class="tips">
        <div class="tips-item">
          <span>1</span>
          <span>拍照, 上传作业 </span>
        </div>
        <div class="tips-item">
          <span>2</span>
          <span>提交错题反馈 </span>
        </div>
        <div class="tips-item">
          <span>3</span>
          <span>操作完成 </span>
        </div>
      </div>
      <div class="footer">
        <div class="checkbox">
          <van-checkbox v-model="checked" shape="square" icon-size="14px"
            >下次不再提示</van-checkbox
          >
        </div>
        <van-button type="primary" @click="onClick">开始上传作业</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup lang="ts">
import useRouter from '@/hooks/useRouter'

defineProps({
  showPop: {
    type: Boolean,
    default: false,
  },
})

const checked = ref(false)

const emit = defineEmits(['update:showPop', 'emitParent'])

// 关闭弹窗
const onClose = (): void => {
  emit('update:showPop', false)
}

// 开始上传作业
const onClick = (): void => {
  // console.log('开始上传作业')
  // localStorage.setItem('needTips', JSON.stringify(checked.value))
  emit('update:showPop', false)
  emit('emitParent', { needTips: checked.value })
  // useRouter.routerPushMixin('HomeworkPhoto')
}
</script>

<style lang="scss" scoped>
.popup {
  :deep(.van-popup) {
    width: 60%;
    padding: 15px 15px 18px;
    // border-radius: 20px;
    img {
      width: 103px;
      height: 97px;
      position: absolute;
      top: 23px;
      right: 0;
    }
    h4 {
      font-size: 18px;
      font-family: PingFang SC-Medium, PingFang SC;
      font-weight: 550;
      color: #000000;
      line-height: 24px;
      margin-bottom: 14px;
    }
    .tips {
      margin-bottom: 18px;
      padding-left: 10px;
      .tips-item {
        height: 40px;
        display: flex;
        align-items: center;
        span:first-child {
          display: inline-block;
          width: 20px;
          height: 20px;
          background: #3bcfae;
          opacity: 1;
          text-align: center;
          font-size: 13px;
          font-family: FontName-Regular, FontName;
          font-weight: 400;
          color: #ffffff;
          line-height: 20px;
          border-radius: 50%;
          margin-right: 8px;
        }
        span:last-child {
          font-size: 14px;
          font-family: PingFang SC-Medium, PingFang SC;
          font-weight: 500;
          color: #262626;
          line-height: 16px;
        }
      }
    }

    .footer {
      text-align: center;
      position: relative;
      .checkbox {
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
      }
    }
  }

  :deep(.van-button) {
    padding-left: 40px;
    padding-right: 40px;
    border-radius: 22px;
  }
  :deep(.van-checkbox__label) {
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: #b3b3b3;
  }
}
</style>
