<script lang="ts" setup>
import { onHide, onLaunch, onShow } from '@dcloudio/uni-app'
// #ifdef H5
import VConsole from 'vconsole'
import { isProd } from '@/utils/is'
// #endif

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
})
onHide(() => {
  console.log('App Hide')
})
</script>
