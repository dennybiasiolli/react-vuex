import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    isIncrementing: false,
    todos: [],
    visibilityFilter: 'SHOW_ALL'
  },
  getters: {
    countGratherThan2: (state, getters) => state.count > 2
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
    },
    addTodo(state, payload) {
      state.todos = [
        ...state.todos,
        {
          id: payload.id,
          text: payload.text,
          completed: false
        }
      ]
    },
    toggleTodo(state, payload) {
      state.todos = state.todos.map(todo =>
        (todo.id === payload.id)
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    },
    setVisibilityFilter(state, payload) {
      state.visibilityFilter = payload.filter
    }
  },
  actions: {
    incrementAsync(context) {
      context.commit('incrementStart')
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit('increment')
          resolve()
        }, 500)
      }).then(() => context.commit('incrementStop'))
    },
    ADD_TODO({ commit, state }, payload) {
      commit('addTodo', payload)
    },
    TOGGLE_TODO({ commit }, payload) {
      commit('toggleTodo', payload)
    },
    SET_VISIBILITY_FILTER({ commit }, payload) {
      commit('setVisibilityFilter', payload)
    }
  },
})

export default store
