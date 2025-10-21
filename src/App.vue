<template>
  <div id="app">
    <StarsBackground />
    <AppHeader />
    <NavigationBar />
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script>
import StarsBackground from './components/ui/StarsBackground.vue'
import AppHeader from './components/layout/AppHeader.vue'
import NavigationBar from './components/layout/NavigationBar.vue'

export default {
  name: 'App',
  components: {
    StarsBackground,
    AppHeader,
    NavigationBar
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  min-height: 100vh;
  overflow-x: hidden;
}

.main-content {
  min-height: calc(100vh - 140px);
}
</style>