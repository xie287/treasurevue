<template>
  <div class="home-view">
    <div class="container">
      <div class="welcome-section">
        <h1>🏝️ 神秘宝藏全景地图</h1>
        <p>选择一个地点开始你的冒险之旅！</p>
        
        <div v-if="!isLoggedIn" class="login-prompt">
          <p>登录以保存进度和参与排名</p>
          <ColorButton color="green" @click="$router.push('/profile')">
            👤 立即登录
          </ColorButton>
        </div>
      </div>

      <div class="panorama-map">
        <!-- 循环时使用包含键名的locations，传递键名作为参数 -->
        <LocationCard
        v-for="location in locationsList"
        :key="location.key"
        :location="location"
        :progress="getProgress(location.key)"
        @select="goToLocation(location.key)"
        />
      </div> 

      <div class="game-stats" v-if="isLoggedIn">
        <h3>你的冒险统计</h3>
        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-value">{{ totalSteps }}</div>
            <div class="stat-label">总进度</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ completedLocations }}</div>
            <div class="stat-label">完成地点</div>
          </div>
          <div class="stat-item">
            <div class="stat-value">{{ userScore }}</div>
            <div class="stat-label">当前积分</div>
          </div>
        </div>
      </div>

      <div class="controls">
        <ColorButton color="blue" @click="resetGame">
          🔄 重置游戏进度
        </ColorButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { locationThemes } from '../utils/gameData'
import LocationCard from '../components/game/LocationCard.vue'
import ColorButton from '../components/ui/ColorButton.vue'

export default {
  name: 'HomeView',
  components: {
    LocationCard,
    ColorButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // 转换为包含键名（forest/mountain/beach）的数组
    const locationsList = computed(() => {
      return Object.entries(locationThemes).map(([key, value]) => ({
        key,  // 保留数据键名
        ...value  // 包含name、icon等显示信息
      }))
    })

    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    const userScore = computed(() => store.state.user?.score || 0)
    const gameState = computed(() => store.state.gameState)

    const totalSteps = computed(() => {
      return Object.values(gameState.value).reduce((total, loc) => {
        return total + (loc.step || 0)
      }, 0)
    })

    const completedLocations = computed(() => {
      return Object.values(gameState.value).filter(loc => loc.finished).length
    })

    // 根据键名获取进度
    const getProgress = (locationKey) => {
      return store.getters.getUserProgress(locationKey)
    }

    // 路由参数使用键名
    const goToLocation = (locationKey) => {
      router.push(`/location/${locationKey}`)
    }

    const resetGame = () => {
      if (confirm('确定要重置所有游戏进度吗？')) {
        store.dispatch('resetGame')
      }
    }

    return {
      locationsList,  // 包含键名的列表
      isLoggedIn,
      userScore,
      totalSteps,
      completedLocations,
      getProgress,
      goToLocation,
      resetGame
    }
  }
}
</script>

<style scoped>
/* 样式部分 */
.home-view {
  padding: 40px 20px;
  min-height: 100vh;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.welcome-section {
  text-align: center;
  margin-bottom: 40px;
}

.welcome-section h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 10px;
}

.welcome-section p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.login-prompt {
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  padding: 20px;
  border-radius: 10px;
  margin: 20px auto;
  max-width: 400px;
}

.panorama-map {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin: 60px 0;
  flex-wrap: wrap;
}

.game-stats {
  background: rgba(255,255,255,0.9);
  border-radius: 15px;
  padding: 30px;
  margin: 40px 0;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.game-stats h3 {
  text-align: center;
  color: #333;
  margin-bottom: 25px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 20px;
  max-width: 500px;
  margin: 0 auto;
}

.stat-item {
  text-align: center;
  padding: 20px;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 10px;
}

.stat-value {
  font-size: 2rem;
  font-weight: bold;
  color: #1e88e5;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.controls {
  text-align: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .panorama-map {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>