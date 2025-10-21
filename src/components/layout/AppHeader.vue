<template>
  <header class="app-header">
    <div class="header-content">
      <h1>🏝️ 神秘宝藏探险</h1>
      <p>开启你的冒险之旅，发现隐藏的宝藏！</p>
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style scoped>
.app-header {
  background: linear-gradient(45deg, #1e88e5, #43a047);
  color: white;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.header-content h1 {
  font-size: 2.2rem;
  margin-bottom: 10px;
  text-shadow: 2px 2px 8px rgba(0,0,0,0.2);
}

.header-content p {
  font-size: 1.1rem;
  opacity: 0.9;
}
</style>