import Vue from 'vue';
import Vuex from 'vuex';
import { INCREMENT, INCREMENT_START, INCREMENT_STOP } from '../mutations';
import { INCREMENT_ASYNC } from '../actions';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    count: 0,
    isIncrementing: false,
  },
  getters: {
    countGreaterThan2: (state/* , getters */) => state.count > 2,
  },
  mutations: {
    [INCREMENT](state) {
      // eslint-disable-next-line no-param-reassign
      state.count += 1;
    },
    [INCREMENT_START](state) {
      // eslint-disable-next-line no-param-reassign
      state.isIncrementing = true;
    },
    [INCREMENT_STOP](state) {
      // eslint-disable-next-line no-param-reassign
      state.isIncrementing = false;
    },
  },
  actions: {
    [INCREMENT_ASYNC]({ commit, state }/* , payload */) {
      commit(INCREMENT_START);
      return new Promise((resolve) => {
        setTimeout(() => {
          commit(INCREMENT);
          resolve();
        }, 500);
      }).then(() => commit(INCREMENT_STOP))
        .then(() => state.count);
    },
  },
  modules: {
    mod1: {
      namespaced: true,
      state: {
        count: 1000,
        isIncrementing: false,
      },
      getters: {
        countGreaterThan1002: (state/* , getters */) => state.count > 1002,
      },
      mutations: {
        increment(state) {
          // eslint-disable-next-line no-param-reassign
          state.count += 1;
        },
        incrementStart(state) {
          // eslint-disable-next-line no-param-reassign
          state.isIncrementing = true;
        },
        incrementStop(state) {
          // eslint-disable-next-line no-param-reassign
          state.isIncrementing = false;
        },
      },
      actions: {
        incrementAsync({ commit, state }) {
          commit('incrementStart');
          return new Promise((resolve) => {
            setTimeout(() => {
              commit('increment');
              resolve();
            }, 500);
          }).then(() => commit('incrementStop'))
            .then(() => state.count);
        },
      },
    },
  },
});

// store.subscribe((mutation, state) => {
//   console.log(mutation, {...state})
// })
