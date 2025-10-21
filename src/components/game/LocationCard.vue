<template>
  <div 
    :class="['location-card', location.name]"
    @click="$emit('select')"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="handleMouseDown"
    @mouseup="handleMouseUp"
  >
    <div class="icon">{{ location.icon }}</div>
    <div class="title">{{ location.name }}</div>
    <div class="progress">
      <div class="progress-bar">
        <div 
          class="progress-fill" 
          :style="{ width: progressPercent + '%' }"
        ></div>
      </div>
      <span class="progress-text">{{ progress.step }}/{{ totalSteps }} 步</span>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'LocationCard',
  props: {
    location: {
      type: Object,
      required: true
    },
    progress: {
      type: Object,
      default: () => ({ step: 0, finished: false })
    }
  },
  emits: ['select'],
  setup(props) {
    const totalSteps = 3 // 每个地点3个步骤

    const progressPercent = computed(() => {
      return (props.progress.step / totalSteps) * 100
    })

    const handleMouseEnter = (event) => {
      event.target.style.transform = 'scale(1.08) rotate(-2deg)'
      event.target.style.boxShadow = '0 12px 32px rgba(0,0,0,0.2)'
    }

    const handleMouseLeave = (event) => {
      event.target.style.transform = ''
      event.target.style.boxShadow = ''
    }

    const handleMouseDown = (event) => {
      event.target.style.transform = 'scale(0.97)'
    }

    const handleMouseUp = (event) => {
      event.target.style.transform = 'scale(1.08) rotate(-2deg)'
    }

    return {
      totalSteps,
      progressPercent,
      handleMouseEnter,
      handleMouseLeave,
      handleMouseDown,
      handleMouseUp
    }
  }
}
</script>

<style scoped>
.location-card {
  background: linear-gradient(135deg, #e3f2fd, #a5d6a7);
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(30,136,229,0.15);
  padding: 30px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  width: 200px;
  position: relative;
  border: 3px solid transparent;
  opacity: 0;
  transform: translateY(40px) scale(0.95);
  animation: cardFadeIn 0.7s forwards;
}

.location-card.forest:hover { 
  border-color: #43a047; 
  box-shadow: 0 8px 24px rgba(67,160,71,0.3); 
}

.location-card.mountain:hover { 
  border-color: #1e88e5; 
  box-shadow: 0 8px 24px rgba(30,136,229,0.3); 
}

.location-card.beach:hover { 
  border-color: #ffd700; 
  box-shadow: 0 8px 24px rgba(255,215,0,0.3); 
}

.location-card:hover {
  transform: translateY(-10px) scale(1.05);
}

.icon {
  font-size: 3rem;
  margin-bottom: 15px;
}

.title {
  font-size: 1.3rem;
  font-weight: bold;
  color: #1565c0;
  margin-bottom: 15px;
}

.progress {
  margin-top: 10px;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #e0e0e0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #43a047, #ffd700);
  border-radius: 3px;
  transition: width 0.5s;
}

.progress-text {
  font-size: 0.8rem;
  color: #666;
}

@keyframes cardFadeIn {
  to { 
    opacity: 1; 
    transform: none;
  }
}
</style>