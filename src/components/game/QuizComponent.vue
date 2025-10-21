<template>
  <div class="quiz-component">
    <div class="quiz-question">
      <h3>{{ quiz.question }}</h3>
    </div>
    <div class="quiz-options">
      <button
        v-for="(option, index) in quiz.options"
        :key="index"
        class="quiz-option"
        :class="{ 
          correct: selectedAnswer === index && showFeedback && index === quiz.answer,
          wrong: selectedAnswer === index && showFeedback && index !== quiz.answer
        }"
        @click="selectAnswer(index)"
        :disabled="showFeedback"
      >
        {{ option }}
      </button>
    </div>
    <div v-if="showFeedback" class="quiz-feedback">
      <p :class="feedbackClass">{{ feedbackMessage }}</p>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  name: 'QuizComponent',
  props: {
    quiz: {
      type: Object,
      required: true
    }
  },
  emits: ['answer'],
  setup(props, { emit }) {
    const selectedAnswer = ref(null)
    const showFeedback = ref(false)

    const selectAnswer = (index) => {
      if (showFeedback.value) return
      
      selectedAnswer.value = index
      showFeedback.value = true
      
      const correct = index === props.quiz.answer
      emit('answer', correct)
    }

    const feedbackMessage = computed(() => {
      if (selectedAnswer.value === props.quiz.answer) {
        return props.quiz.correctMsg
      } else {
        return props.quiz.wrongMsg
      }
    })

    const feedbackClass = computed(() => {
      return selectedAnswer.value === props.quiz.answer ? 'correct' : 'wrong'
    })

    return {
      selectedAnswer,
      showFeedback,
      selectAnswer,
      feedbackMessage,
      feedbackClass
    }
  }
}
</script>

<style scoped>
.quiz-component {
  max-width: 500px;
  margin: 20px 0;
}

.quiz-question h3 {
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.quiz-options {
  display: grid;
  gap: 10px;
  margin-bottom: 20px;
}

.quiz-option {
  padding: 15px 20px;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  background: white;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 1rem;
}

.quiz-option:hover:not(:disabled) {
  border-color: #1e88e5;
  background: #f5f9ff;
}

.quiz-option.correct {
  border-color: #43a047;
  background: #e8f5e8;
  color: #2e7d32;
}

.quiz-option.wrong {
  border-color: #e53935;
  background: #ffebee;
  color: #c62828;
}

.quiz-feedback {
  text-align: center;
  padding: 15px;
  border-radius: 10px;
  margin-top: 15px;
}

.quiz-feedback .correct {
  color: #43a047;
  font-weight: bold;
}

.quiz-feedback .wrong {
  color: #e53935;
  font-weight: bold;
}
</style>