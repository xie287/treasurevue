<template>
  <div class="adventure-log">
    <h3>冒险日志</h3>
    <div class="log-entries">
      <div 
        v-for="(entry, index) in displayedEntries" 
        :key="index"
        class="log-entry"
      >
        <span class="log-icon">{{ entry.effect }}</span>
        <span class="log-text" v-html="entry.text"></span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdventureLog',
  props: {
    entries: {
      type: Array,
      default: () => []
    },
    currentStep: {
      type: Number,
      default: 0
    }
  },
  computed: {
    displayedEntries() {
      return this.entries.slice(0, this.currentStep)
    }
  }
}
</script>

<style scoped>
.adventure-log {
  background: rgba(255,255,255,0.9);
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.adventure-log h3 {
  color: #333;
  margin-bottom: 15px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 8px;
}

.log-entries {
  max-height: 200px;
  overflow-y: auto;
}

.log-entry {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 6px;
  background: #f8f9fa;
  animation: logEntrySlide 0.5s ease;
}

.log-entry:last-child {
  margin-bottom: 0;
}

.log-icon {
  font-size: 1.2rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.log-text {
  line-height: 1.4;
  color: #333;
}

@keyframes logEntrySlide {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>