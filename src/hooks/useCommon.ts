/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-11 14:48:00
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-11 14:48:23
 */
import { reactive, toRefs } from 'vue'
import momentMini from 'moment-mini'
import { ObjTy } from '~/common'
const hooksFunc = function () {
  //data
  const state: ObjTy = reactive({
    //time relative
    todayTimeMixin: null,
    currentTimeMixin: null,
    todayTimeLastMixin: null,
    yesterdayTimeMixin: null,
    beforeThreeDateTimeMixin: null
  })

  //create
  state.todayTimeMixin = momentMini().startOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.currentTimeMixin = momentMini(new Date()).format('YYYY-MM-DD HH:mm:ss')
  state.todayTimeLastMixin = momentMini().endOf('day').format('YYYY-MM-DD HH:mm:ss')
  state.beforeThreeDateTimeMixin = momentMini().add(-3, 'days').format('YYYY-MM-DD HH:mm:ss')
  state.yesterdayTimeMixin = momentMini().add(-1, 'days').format('YYYY-MM-DD HH:mm:ss')

  //function
  const sleepMixin = (time: number) => {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        clearTimeout(timer)
        resolve('')
      }, time)
    })
  }
  return {
    sleepMixin,
    state
  }
}
export default hooksFunc()
