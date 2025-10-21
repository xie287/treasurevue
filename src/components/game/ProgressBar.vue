<template>
  <div class="progress-container">
    <div class="progress-bar">
      <div 
        class="progress-fill" 
        :style="{ width: progressPercent + '%' }"
      ></div>
    </div>
    <div class="progress-text">
      进度: {{ currentStep }}/{{ totalSteps }} ({{ Math.round(progressPercent) }}%)
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ProgressBar',
  props: {
    currentStep: {
      type: Number,
      required: true
    },
    totalSteps: {
      type: Number,
      required: true
    }
  },
  setup(props) {
    const progressPercent = computed(() => {
      return (props.currentStep / props.totalSteps) * 100
    })

    return {
      progressPercent
    }
  }
}
</script>

<style scoped>
.progress-container {
  width: 100%;
  margin: 20px 0;
}

.progress-bar {
  width: 100%;
  height: 12px;
  background: #e0e0e0;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #43a047, #ffd700);
  border-radius: 6px;
  transition: width 0.5s ease;
}

.progress-text {
  text-align: center;
  color: #666;
  font-size: 0.9rem;
}
</style>