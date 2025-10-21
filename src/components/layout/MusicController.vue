<template>
  <button class="music-controller" @click="toggleMusic">
    {{ isPlaying ? '🎵 暂停音乐' : '🎵 播放音乐' }}
  </button>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
  name: 'MusicController',
  setup() {
    const isPlaying = ref(false)
    const audio = ref(null)

    onMounted(() => {
      audio.value = new Audio('/assets/main-theme.wav')
      audio.value.loop = true
      audio.value.volume = 0.5
      
      // 用户交互后自动播放
      document.addEventListener('click', () => {
        if (!isPlaying.value) {
          audio.value.play().catch(console.error)
          isPlaying.value = true
        }
      }, { once: true })
    })

    const toggleMusic = () => {
      if (isPlaying.value) {
        audio.value.pause()
      } else {
        audio.value.play().catch(console.error)
      }
      isPlaying.value = !isPlaying.value
    }

    return {
      isPlaying,
      toggleMusic
    }
  }
}
</script>

<style scoped>
.music-controller {
  background: none;
  border: none;
  padding: 15px 20px;
  color: #333;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  border-bottom: 3px solid transparent;
}

.music-controller:hover {
  color: #1e88e5;
  border-bottom-color: #1e88e5;
  background: rgba(30, 136, 229, 0.1);
}
</style>