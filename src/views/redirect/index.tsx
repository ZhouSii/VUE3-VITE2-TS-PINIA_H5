/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-11 11:15:49
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-11 11:16:34
 */
import { defineComponent,onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const router = useRouter()
    onBeforeMount(() => {
      const { params, query } = route
      const { path } = params
      router.replace({ path: '/' + path, query })
    })
    return () => <div> </div>
  }
})
