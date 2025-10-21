<template>
  <div class="adventure-area">
    <div v-if="currentStep === 0" class="welcome-message">
      <h2>欢迎来到 {{ theme.name }}！</h2>
      <p>{{ locationDescription }}</p>
      <ColorButton color="green" @click="startAdventure">
        开始冒险
      </ColorButton>
    </div>

    <div v-else-if="currentStep <= totalSteps" class="adventure-step">
      <div class="step-content">
        <div class="step-icon">{{ currentAdventure.effect }}</div>
        <div class="step-text" v-html="currentAdventure.text"></div>
      </div>

      <QuizComponent 
        v-if="currentAdventure.quiz"
        :quiz="currentAdventure.quiz"
        @answer="handleQuizAnswer"
      />

      <div v-else class="step-actions">
        <ColorButton color="blue" @click="nextStep">
          继续冒险
        </ColorButton>
      </div>
    </div>

    <div v-else class="completion-message">
      <div class="completion-icon">🎉</div>
      <h3>恭喜你完成 {{ theme.name }} 的冒险！</h3>
      <p>快去探索其他地点吧！</p>
      <ColorButton color="green" @click="$router.push('/')">
        返回地图
      </ColorButton>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import ColorButton from '../ui/ColorButton.vue'
import QuizComponent from './QuizComponent.vue'

export default {
  name: 'AdventureArea',
  components: {
    ColorButton,
    QuizComponent
  },
  props: {
    locationName: String,
    adventureData: Array,
    theme: Object
  },
  setup(props) {
    const store = useStore()
    const router = useRouter()

    // 添加地点描述计算属性
    const locationDescription = computed(() => {
      const descriptions = {
        forest: '你走进了一片神秘的森林，阳光斑驳，鸟鸣阵阵。',
        mountain: '你站在高山之巅，寒风呼啸，云雾缭绕，远眺群山。',
        beach: '金色沙滩，碧蓝海水，阳光温暖，海鸟飞翔。'
      }
      return descriptions[props.locationName] || '一个神秘的地方等待你的探索...'
    })

    const currentStep = computed(() => {
      const progress = store.getters.getUserProgress(props.locationName)
      return progress.step
    })

    const totalSteps = computed(() => props.adventureData.length)

    const currentAdventure = computed(() => {
      return props.adventureData[currentStep.value - 1] || {}
    })

    const startAdventure = () => {
      store.dispatch('updateProgress', {
        location: props.locationName,
        step: 1,
        finished: false
      })
    }

    const nextStep = () => {
      const newStep = currentStep.value + 1
      const finished = newStep > totalSteps.value
      
      store.dispatch('updateProgress', {
        location: props.locationName,
        step: newStep,
        finished
      })
    }

    const handleQuizAnswer = (correct) => {
      if (correct) {
        setTimeout(nextStep, 1200)
      }
    }

    return {
      locationDescription,  // 导出这个计算属性
      currentStep,
      totalSteps,
      currentAdventure,
      startAdventure,
      nextStep,
      handleQuizAnswer
    }
  }
}
</script>

<style scoped>
.adventure-area {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 30px;
}

.welcome-message,
.completion-message {
  text-align: center;
  max-width: 500px;
}

.welcome-message h2,
.completion-message h3 {
  color: #333;
  margin-bottom: 15px;
}

.step-content {
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
  max-width: 600px;
}

.step-icon {
  font-size: 3rem;
  flex-shrink: 0;
}

.step-text {
  font-size: 1.2rem;
  line-height: 1.6;
  color: #333;
}

.completion-icon {
  font-size: 4rem;
  margin-bottom: 20px;
}

.step-actions {
  margin-top: 20px;
}
</style>