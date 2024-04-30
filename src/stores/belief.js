import { defineStore } from 'pinia'

export const useBeliefStore = defineStore('belief', {
  state: () => ({
    counter: 11
  }),

  getters: {
    doubleCount (state) {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
