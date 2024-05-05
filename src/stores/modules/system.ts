import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSystemStore = defineStore(
  'system',
  () => {
    // 系统信息
    const systemInfo = uni.getSystemInfoSync()
    console.log('系统信息 => ', systemInfo)

    // 屏幕高度
    const screenHeight = ref<number>(systemInfo?.screenHeight ?? 0)
    console.log('屏幕高度 => ', screenHeight.value)

    // 状态栏高度
    const statusBarHeight = ref<number>(systemInfo?.statusBarHeight ?? 0)
    console.log('状态栏高度 => ', statusBarHeight.value)

    // 导航栏高度
    const navBarHeight = ref<number>(40)
    console.log('导航栏高度 => ', navBarHeight.value)

    // 顶部总高度
    const navHeight = ref<number>(statusBarHeight.value + navBarHeight.value)
    console.log('顶部总高度 => ', navHeight.value)

    // 底部安全区高度
    const safeBottomHeight = ref<number>(screenHeight.value - (systemInfo?.safeArea?.bottom ?? screenHeight.value))
    console.log('底部安全区高度 => ', safeBottomHeight.value)

    // 底部导航栏高度
    const tabBarHeight = ref<number>(50)
    console.log('底部导航栏高度 => ', tabBarHeight.value)

    // 底部总高度
    const tabHeight = ref<number>(tabBarHeight.value + safeBottomHeight.value)
    console.log('底部总高度 => ', tabHeight.value)

    // 导航页面高度
    const tabPageHeight = ref<number>(screenHeight.value - navHeight.value - tabHeight.value)
    console.log('导航页面高度 => ', tabPageHeight.value)

    return {
      screenHeight,
      statusBarHeight,
      navBarHeight,
      navHeight,
      tabHeight,
      safeBottomHeight,
      tabBarHeight,
      tabPageHeight,
    }
  },
)
