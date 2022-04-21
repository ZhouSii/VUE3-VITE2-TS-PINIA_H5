/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-11 14:45:00
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-11 14:45:00
 */
//https://blog.csdn.net/weixin_34865745/article/details/113992767
import { onMounted, ref } from 'vue'
export default function () {
  const ref1 = ref('hook数据')
  const ref2 = ref('hook数据ref2')
  onMounted(() => {})
  const hooksFunc = () => {
    alert('我是hook里的方法')
    return 'hook方法执行了'
  }
  return {
    ref1,
    ref2,
    hooksFunc
  }
}
