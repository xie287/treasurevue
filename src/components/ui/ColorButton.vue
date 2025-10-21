<template>
  <button 
    :class="['color-button', color]" 
    :style="styles"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'ColorButton',
  props: {
    color: {
      type: String,
      default: 'blue'
    },
    width: String,
    margin: String
  },
  emits: ['click'],
  computed: {
    styles() {
      return {
        width: this.width,
        margin: this.margin
      }
    }
  }
}
</script>

<style scoped>
.color-button {
  border: none;
  border-radius: 20px;
  padding: 12px 30px;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.color-button.blue {
  background: linear-gradient(90deg, #396afc 0%, #2948ff 100%);
  color: white;
}

.color-button.green {
  background: linear-gradient(90deg, #43a047 0%, #2e7d32 100%);
  color: white;
}

.color-button:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}
</style>