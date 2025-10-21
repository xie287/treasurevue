import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('treasureGameUser')) || null,
    gameState: JSON.parse(localStorage.getItem('treasureGameState')) || {},
    users: JSON.parse(localStorage.getItem('treasureGameUsers')) || []
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user
      localStorage.setItem('treasureGameUser', JSON.stringify(user))
    },
    UPDATE_GAME_STATE(state, { location, step, finished }) {
      if (!state.gameState[location]) {
        state.gameState[location] = { step: 0, finished: false }
      }
      state.gameState[location].step = step
      state.gameState[location].finished = finished
      localStorage.setItem('treasureGameState', JSON.stringify(state.gameState))
    },
    // 重置整个游戏状态的 mutation
    RESET_GAME_STATE(state) {
      state.gameState = {}; // 清空所有地点的进度
      localStorage.setItem('treasureGameState', JSON.stringify(state.gameState));
    },
    ADD_USER(state, user) {
      state.users.push(user)
      localStorage.setItem('treasureGameUsers', JSON.stringify(state.users))
    },
    UPDATE_USER_SCORE(state, { userId, score }) {
      const user = state.users.find(u => u.id === userId)
      if (user) {
        user.score = score
        localStorage.setItem('treasureGameUsers', JSON.stringify(state.users))
      }
    }
  },
  actions: {
    login({ commit }, userInfo) {
      const user = {
        id: Date.now(),
        name: userInfo.name,
        score: 0,
        joinDate: new Date().toISOString()
      }
      commit('SET_USER', user)
      commit('ADD_USER', user)
    },
    updateProgress({ commit, state }, { location, step, finished }) {
      commit('UPDATE_GAME_STATE', { location, step, finished })
      
      // 计算分数
      if (state.user) {
        const totalSteps = Object.values(state.gameState)
          .reduce((total, loc) => total + loc.step, 0)
        const score = totalSteps * 10
        
        commit('UPDATE_USER_SCORE', {
          userId: state.user.id,
          score
        })
      }
    },
    resetGame({ commit, state }) {
      commit('RESET_GAME_STATE')
      if (state.user) {
        commit('UPDATE_USER_SCORE', {
          userId: state.user.id,
          score: 0
        })
      }
    }
  },
  getters: {
    isLoggedIn: state => !!state.user,
    getUserRanking: state => {
      return state.users
        .slice()
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
    },
    getUserProgress: state => location => {
      return state.gameState[location] || { step: 0, finished: false }
    }
  }
})
