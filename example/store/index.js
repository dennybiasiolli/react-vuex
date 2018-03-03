import mutations, {
  INCREMENT, INCREMENT_START, INCREMENT_STOP
} from '../mutations'
import actions, {
  INCREMENT_ASYNC
} from '../actions'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    count: 0,
    isIncrementing: false
  },
  getters: {
    countGreaterThan2: (state, getters) => state.count > 2
  },
  mutations: {
    [INCREMENT](state) {
      state.count++
    },
    [INCREMENT_START](state) {
      state.isIncrementing = true
    },
    [INCREMENT_STOP](state) {
      state.isIncrementing = false
    }
  },
  actions: {
    [INCREMENT_ASYNC]({ commit, state }, payload) {
      commit(INCREMENT_START)
      return new Promise(resolve => {
        setTimeout(() => {
          commit(INCREMENT)
          resolve()
        }, 500)
      }).then(() => commit(INCREMENT_STOP))
        .then(() => state.count)
    }
  },
  modules: {
    mod1: {
      namespaced: true,
      state: {
        count: 1000,
        isIncrementing: false
      },
      getters: {
        countGreaterThan1002: (state, getters) => state.count > 1002
      },
      mutations: {
        increment(state) {
          state.count++
        },
        incrementStart(state) {
          state.isIncrementing = true
        },
        incrementStop(state) {
          state.isIncrementing = false
        }
      },
      actions: {
        incrementAsync({ commit, state }) {
          commit('incrementStart')
          return new Promise(resolve => {
            setTimeout(() => {
              commit('increment')
              resolve()
            }, 500)
          }).then(() => commit('incrementStop'))
            .then(() => state.count)
        }
      }
    }
  }
})

// store.subscribe((mutation, state) => {
//   console.log(mutation, {...state})
// })
