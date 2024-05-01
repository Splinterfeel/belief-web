import { defineStore } from 'pinia'
import { api } from 'boot/axios'

const user_name = localStorage.getItem('user.name') || null
const user_cookie = localStorage.getItem('user.cookie') || null

let user_logged_in = false
if ((user_name !== null) && (user_cookie !== null) && (user_name !== 'null') && (user_cookie !== 'null')){
  user_logged_in = true
}

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
    logout(){
      localStorage.setItem('user.name', null)
      localStorage.setItem('user.cookie', null)
      this.user.logged_in = false
      this.user.name = null
      this.user.cookie = null
    },
    set_user(name, cookie){
      localStorage.setItem('user.name', name)
      localStorage.setItem('user.cookie', cookie)
      this.user.logged_in = true
      this.user.name = name
      this.user.cookie = cookie
      console.log(api.cookie)
      // api.cookie('user_cookie', this.user.cookie)
      api.defaults.headers.common['user_cookie'] = this.user.cookie
    },
  }
})
