import { defineStore } from 'pinia'

const user_name = localStorage.getItem('user.name')
const user_cookie = localStorage.getItem('user.cookie')
const user_logged_in = user_name && user_cookie

export const useBeliefStore = defineStore('belief', {
  state: () => ({
    user: {
      logged_in: user_logged_in,
      name: user_name,
      cookie: user_cookie
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
      localStorage.setItem('user.name', name)
      localStorage.setItem('user.cookie', cookie)
      this.user.logged_in = true
      this.user.name = name
      this.user.cookie = cookie
    },
  }
})
