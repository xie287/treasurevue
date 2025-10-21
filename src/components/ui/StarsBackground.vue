<template>
  <div class="stars-background" ref="starsContainer"></div>
</template>

<script>
import { onMounted, ref } from 'vue'

export default {
  name: 'StarsBackground',
  setup() {
    const starsContainer = ref(null)

    onMounted(() => {
      createStars()
    })

    const createStars = () => {
      if (!starsContainer.value) return
      
      for (let i = 0; i < 80; i++) {
        const star = document.createElement('div')
        star.className = 'star'
        star.style.width = star.style.height = Math.random() * 2 + 1 + 'px'
        star.style.top = Math.random() * 100 + '%'
        star.style.left = Math.random() * 100 + '%'
        star.style.animationDuration = (Math.random() * 3 + 2) + 's'
        starsContainer.value.appendChild(star)
      }
    }

    return {
      starsContainer
    }
  }
}
</script>

<style scoped>
.stars-background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
}

.star {
  position: absolute;
  background-color: white;
  border-radius: 50%;
  animation: twinkle 5s infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 1; }
}
</style>