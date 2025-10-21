<template>
  <nav class="navigation-bar">
    <div class="nav-container">
      <router-link to="/" class="nav-item">🏠 首页</router-link>
      <router-link to="/profile" class="nav-item">👤 个人中心</router-link>
      <router-link to="/ranking" class="nav-item">🏆 排行榜</router-link>
      <MusicController class="nav-item" />
    </div>
  </nav>
</template>

<script>
import MusicController from './MusicController.vue'

export default {
  name: 'NavigationBar',
  components: {
    MusicController
  }
}
</script>

<style scoped>
.navigation-bar {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e0e0e0;
  padding: 0 20px;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-item {
  padding: 15px 20px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.nav-item:hover, .nav-item.router-link-active {
  color: #1e88e5;
  border-bottom-color: #1e88e5;
  background: rgba(30, 136, 229, 0.1);
}
</style>