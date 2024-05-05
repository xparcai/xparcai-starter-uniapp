<script lang="ts" setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
// #ifdef H5
import VConsole from 'vconsole'
import { isProd } from '@/utils/is'
// #endif
import { useSystemStore } from '@/stores/modules/system'

const systemStore = useSystemStore()

onLaunch(async () => {
  console.log('App Launch')
})
onShow(() => {
  console.log('App Show')
  console.log('当前环境 => ', import.meta.env.MODE)
  // #ifdef H5
  if (!isProd())
    new VConsole()
  // #endif

  // 确保获取的系统信息是最新且最正确的
  nextTick(() => {
    const systemInfo = uni.getSystemInfoSync()
    console.log('系统信息 => ', systemInfo)
    systemStore.setSystemInfo(systemInfo)
  })
})
onHide(() => {
  console.log('App Hide')
})
</script>
