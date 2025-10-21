<template>
  <div class="user-profile">
    <div class="container">
      <div class="profile-header">
        <h1>👤 个人中心</h1>
        <p>管理你的冒险档案和游戏进度</p>
      </div>

      <div v-if="!isLoggedIn" class="login-section">
        <div class="login-form">
          <h2>登录/注册</h2>
          <form @submit.prevent="handleLogin">
            <div class="form-group">
              <label for="username">冒险者名称:</label>
              <input
                id="username"
                v-model="username"
                type="text"
                required
                placeholder="输入你的冒险者名称"
                maxlength="20"
              >
            </div>
            <ColorButton type="submit" color="green" width="100%">
              🚀 开始冒险
            </ColorButton>
          </form>
        </div>
      </div>

      <div v-else class="profile-section">
        <div class="user-info">
          <div class="avatar">{{ user.name.charAt(0).toUpperCase() }}</div>
          <div class="user-details">
            <h2>{{ user.name }}</h2>
            <p>加入时间: {{ formatDate(user.joinDate) }}</p>
            <p class="score">冒险积分: <strong>{{ user.score }}</strong></p>
          </div>
        </div>

        <div class="progress-section">
          <h3>冒险进度</h3>
          <div class="location-progress">
            <div
              v-for="location in locations"
              :key="location.name"
              class="progress-item"
            >
              <div class="location-info">
                <span class="location-icon">{{ location.icon }}</span>
                <span class="location-name">{{ location.name }}</span>
              </div>
              <div class="progress-display">
                <div class="progress-bar">
                  <div 
                    class="progress-fill"
                    :style="{ width: getProgressPercent(location.name) + '%' }"
                  ></div>
                </div>
                <span class="progress-text">
                  {{ getProgress(location.name).step }}/3
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="profile-actions">
          <ColorButton color="blue" @click="resetProgress">
            🔄 重置进度
          </ColorButton>
          <ColorButton color="red" @click="logout">
            🚪 退出登录
          </ColorButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { locationThemes } from '../utils/gameData'
import ColorButton from '../components/ui/ColorButton.vue'

export default {
  name: 'UserProfile',
  components: {
    ColorButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const username = ref('')

    const isLoggedIn = computed(() => store.getters.isLoggedIn)
    const user = computed(() => store.state.user)
    const gameState = computed(() => store.state.gameState)
    const locations = Object.values(locationThemes)

    const handleLogin = () => {
      if (username.value.trim()) {
        store.dispatch('login', { name: username.value.trim() })
        router.push('/')
      }
    }

    const logout = () => {
      store.commit('SET_USER', null)
      router.push('/')
    }

    const resetProgress = () => {
      if (confirm('确定要重置所有游戏进度吗？这将清除你的冒险记录。')) {
        store.dispatch('resetGame')
      }
    }

    const getProgress = (locationName) => {
      return store.getters.getUserProgress(locationName)
    }

    const getProgressPercent = (locationName) => {
      const progress = getProgress(locationName)
      return (progress.step / 3) * 100
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }

    return {
      username,
      isLoggedIn,
      user,
      gameState,
      locations,
      handleLogin,
      logout,
      resetProgress,
      getProgress,
      getProgressPercent,
      formatDate
    }
  }
}
</script>

<style scoped>
.user-profile {
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.container {
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255,255,255,0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
  padding: 40px;
}

.profile-header {
  text-align: center;
  margin-bottom: 40px;
}

.profile-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.profile-header p {
  color: #666;
}

.login-form {
  max-width: 400px;
  margin: 0 auto;
}

.login-form h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #333;
  font-weight: 500;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #1e88e5;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 40px;
  padding: 20px;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 10px;
}

.avatar {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #1e88e5, #43a047);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.user-details h2 {
  color: #333;
  margin-bottom: 5px;
}

.user-details p {
  color: #666;
  margin-bottom: 5px;
}

.score {
  color: #ff6b35 !important;
  font-size: 1.1rem;
}

.progress-section h3 {
  color: #333;
  margin-bottom: 20px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

.location-progress {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.progress-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: transform 0.2s;
}

.progress-item:hover {
  transform: translateX(5px);
}

.location-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.location-icon {
  font-size: 1.5rem;
}

.location-name {
  font-weight: 500;
  color: #333;
}

.progress-display {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  max-width: 200px;
}

.progress-bar {
  flex: 1;
  height: 8px;
  background: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #43a047, #ffd700);
  border-radius: 4px;
  transition: width 0.5s;
}

.progress-text {
  font-size: 0.9rem;
  color: #666;
  min-width: 40px;
  text-align: right;
}

.profile-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #e0e0e0;
}

@media (max-width: 768px) {
  .progress-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .progress-display {
    max-width: none;
    width: 100%;
  }
  
  .profile-actions {
    flex-direction: column;
  }
}
</style>