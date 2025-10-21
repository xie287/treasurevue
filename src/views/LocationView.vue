<template>
  <div class="location-view" :style="locationStyle">
    <div class="container">
      <div class="location-header">
        <h1>{{ theme.icon }} {{ theme.name }}</h1>
        <p>{{ getLocationDescription(locationName) }}</p> <!-- 直接使用函数调用简化 -->
      </div>

      <ProgressBar 
        :current-step="currentStep"
        :total-steps="totalSteps"
      />

      <AdventureLog 
        :entries="adventureData"
        :current-step="currentStep"
      />

      <!-- 使用直接定义的locationName -->
      <AdventureArea
        :location-name="locationName"
        :adventure-data="adventureData"
        :theme="theme"
      />

      <div class="location-controls">
        <ColorButton color="blue" @click="$router.push('/')">
          🗺️ 返回地图
        </ColorButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { adventureData as rawAdventureData, locationThemes } from '../utils/gameData'
import ProgressBar from '../components/game/ProgressBar.vue'
import AdventureLog from '../components/game/AdventureLog.vue'
import AdventureArea from '../components/game/AdventureArea.vue'
import ColorButton from '../components/ui/ColorButton.vue'

export default {
  name: 'LocationView',
  components: {
    ProgressBar,
    AdventureLog,
    AdventureArea,
    ColorButton
  },
  // 移除未使用的name prop
setup() {
  const store = useStore()
  const route = useRoute()
  const locationName = route.params.name  // 直接获取路由参数（键名：forest/mountain/beach）

  // 基于键名获取主题配置
  const theme = computed(() => locationThemes[locationName] || {})
  // 基于键名获取冒险数据 - 使用重命名后的变量
  const adventureData = computed(() => rawAdventureData[locationName] || [])
  
  const progress = computed(() => {
    return store.getters.getUserProgress(locationName)
  })

  const currentStep = computed(() => progress.value.step)
  const totalSteps = computed(() => adventureData.value.length)

  const locationStyle = computed(() => ({
    background: theme.value.background,
    minHeight: '100vh',
    padding: '20px 0'
  }))

  // 直接定义描述获取函数，无需通过computed包装
  const getLocationDescription = (name) => {
    const descriptions = {
      forest: '你走进了一片神秘的森林，阳光斑驳，鸟鸣阵阵。',
      mountain: '你站在高山之巅，寒风呼啸，云雾缭绕，远眺群山。',
      beach: '金色沙滩，碧蓝海水，阳光温暖，海鸟飞翔。'
    }
    return descriptions[name] || '一个神秘的地方等待你的探索...'
  }

  return {
    locationName,  // 导出locationName供模板使用
    theme,
    adventureData,
    currentStep,
    totalSteps,
    locationStyle,
    getLocationDescription  // 导出函数供模板使用
  }
}
}
</script>

<style scoped>
/* 样式部分保持不变 */
.location-view {
  transition: background 0.5s ease;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255,255,255,0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
  padding: 30px;
}

.location-header {
  text-align: center;
  margin-bottom: 30px;
}

.location-header h1 {
  font-size: 2.2rem;
  color: #333;
  margin-bottom: 10px;
}

.location-header p {
  font-size: 1.1rem;
  color: #666;
  line-height: 1.6;
}

.location-controls {
  text-align: center;
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}
</style>