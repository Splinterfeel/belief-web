import { defineStore } from 'pinia'

export const useBeliefStore = defineStore('belief', {
  state: () => ({
    user: {
      logged_in: false,
      name: null,
      cookie: null
    },
    // counter: 11
  }),

  getters: {
    // doubleCount (state) {
    //   return state.counter * 2
    // }
  },

  actions: {
    set_user(name, cookie){
      this.user.logged_in = true
      this.user.name = name
      this.user.cookie = cookie
    },
  }
})
