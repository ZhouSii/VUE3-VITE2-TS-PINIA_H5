<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Zhou
 * @Date: 2022-04-06 14:22:34
 * @LastEditors: Zhou
 * @LastEditTime: 2022-04-12 17:32:18
-->
<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :include="cachedViews">
        <component :is="Component" :key="key" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store/'
let route = useRoute()

const appStore = useAppStore()
// cachePage: is true, keep-alive this Page
// leaveRmCachePage: is true, keep-alive remote when page leave
let oldRoute = null
const key = computed({
  get() {
    //setting title
    if (route.meta && route.meta.title) {
      document.title = route.meta.title
    }

    if (oldRoute?.name) {
      if (oldRoute.meta?.leaveRmCachePage && oldRoute.meta?.cachePage) {
        appStore.M_DEL_CACHED_VIEW(oldRoute.name)
      }
    }
    if (route.name) {
      if (route.meta?.cachePage) {
        appStore.M_ADD_CACHED_VIEW(route.name)
      }
    }
    oldRoute = JSON.parse(JSON.stringify({ name: route.name, meta: route.meta }))
    return route.path
  },
})

const cachedViews = computed(() => {
  return appStore.cachedViews
})
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
  /*margin-top: 60px;*/
}
</style>
