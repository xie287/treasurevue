<template>
  <div class="ranking-view">
    <div class="container">
      <div class="ranking-header">
        <h1>🏆 冒险者排行榜</h1>
        <p>看看谁是最厉害的宝藏猎人！</p>
      </div>

      <div class="ranking-section">
        <div class="ranking-list">
          <div
            v-for="(user, index) in ranking"
            :key="user.id"
            :class="['ranking-item', { current: user.id === currentUser?.id }]"
          >
            <div class="rank">{{ getRankIcon(index + 1) }}</div>
            <div class="user-avatar">{{ user.name.charAt(0).toUpperCase() }}</div>
            <div class="user-info">
              <div class="user-name">{{ user.name }}</div>
              <div class="user-join-date">加入: {{ formatDate(user.joinDate) }}</div>
            </div>
            <div class="user-score">
              <span class="score-value">{{ user.score }}</span>
              <span class="score-label">积分</span>
            </div>
          </div>
        </div>

        <div v-if="ranking.length === 0" class="empty-ranking">
          <div class="empty-icon">📊</div>
          <h3>暂无排名数据</h3>
          <p>成为第一个完成冒险的玩家！</p>
        </div>
      </div>

      <div class="ranking-stats">
        <div class="stat-card">
          <div class="stat-icon">👑</div>
          <div class="stat-content">
            <div class="stat-value">{{ topPlayer?.name || '暂无' }}</div>
            <div class="stat-label">榜首玩家</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚡</div>
          <div class="stat-content">
            <div class="stat-value">{{ topPlayer?.score || 0 }}</div>
            <div class="stat-label">最高积分</div>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <div class="stat-value">{{ ranking.length }}</div>
            <div class="stat-label">总玩家数</div>
          </div>
        </div>
      </div>

      <div class="ranking-actions">
        <ColorButton color="blue" @click="$router.push('/')">
          🗺️ 返回地图
        </ColorButton>
        <ColorButton color="green" @click="$router.push('/profile')" v-if="!isLoggedIn">
          👤 立即加入
        </ColorButton>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ColorButton from '../components/ui/ColorButton.vue'

export default {
  name: 'RankingView',
  components: {
    ColorButton
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const ranking = computed(() => store.getters.getUserRanking)
    const currentUser = computed(() => store.state.user)
    const isLoggedIn = computed(() => store.getters.isLoggedIn)

    const topPlayer = computed(() => ranking.value[0])

    const getRankIcon = (rank) => {
      if (rank === 1) return '🥇'
      if (rank === 2) return '🥈'
      if (rank === 3) return '🥉'
      return rank
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString('zh-CN')
    }

    return {
      ranking,
      currentUser,
      isLoggedIn,
      topPlayer,
      getRankIcon,
      formatDate
    }
  }
}
</script>

<style scoped>
.ranking-view {
  padding: 40px 20px;
  min-height: 100vh;
  background: linear-gradient(135deg, #ffd700 0%, #ff6b35 100%);
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(255,255,255,0.95);
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  overflow: hidden;
  padding: 40px;
}

.ranking-header {
  text-align: center;
  margin-bottom: 40px;
}

.ranking-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.ranking-header p {
  color: #666;
}

.ranking-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 40px;
}

.ranking-item {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 20px;
  background: #f8f9fa;
  border-radius: 10px;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.ranking-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.ranking-item.current {
  border-color: #1e88e5;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
}

.rank {
  font-size: 1.2rem;
  font-weight: bold;
  color: #ff6b35;
  min-width: 30px;
  text-align: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #1e88e5, #43a047);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
}

.user-info {
  flex: 1;
}

.user-name {
  font-weight: 500;
  color: #333;
  margin-bottom: 2px;
}

.user-join-date {
  font-size: 0.8rem;
  color: #666;
}

.user-score {
  text-align: right;
}

.score-value {
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  color: #ff6b35;
}

.score-label {
  font-size: 0.8rem;
  color: #666;
}

.empty-ranking {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.empty-ranking h3 {
  margin-bottom: 10px;
  color: #333;
}

.ranking-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px;
  background: linear-gradient(135deg, #e3f2fd, #f3e5f5);
  border-radius: 10px;
}

.stat-icon {
  font-size: 2rem;
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-size: 1.3rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 5px;
}

.stat-label {
  font-size: 0.9rem;
  color: #666;
}

.ranking-actions {
  display: flex;
  gap: 15px;
  justify-content: center;
}

@media (max-width: 768px) {
  .ranking-stats {
    grid-template-columns: 1fr;
  }
  
  .ranking-actions {
    flex-direction: column;
  }
}
</style>