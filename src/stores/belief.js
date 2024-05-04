import { defineStore } from 'pinia'
import { api } from 'boot/axios'

const user_id = localStorage.getItem('user.id') || null
const user_name = localStorage.getItem('user.name') || null
const user_cookie = localStorage.getItem('user.cookie') || null

let user_logged_in = false
if (
      (user_id !== null) &&
      (user_name !== null) && (user_cookie !== null)
      && (user_name !== 'null') && (user_cookie !== 'null')){
  user_logged_in = true
}

export const useBeliefStore = defineStore('belief', {
  state: () => ({
    user: {
      id: user_id,
      logged_in: user_logged_in,
      name: user_name,
      cookie: user_cookie
    },
    resources: {
      food: 0,
      materials: 0,
      population: 0,
      gold: 0
    }
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
    set_user(id, name, cookie){
      localStorage.setItem('user.id', id)
      localStorage.setItem('user.name', name)
      localStorage.setItem('user.cookie', cookie)
      this.user.logged_in = true
      this.user.id = id
      this.user.name = name
      this.user.cookie = cookie
      api.defaults.headers.common['user_cookie'] = this.user.cookie
    },
    async get_user_strongholds(user_id){
      let resp = await api.get('/strongholds/user?user_id='+user_id)
      return resp.data
    },
    async get_stronghold(id){
      let resp = await api.get('/strongholds/?id='+id)
      return resp.data
    },
    async get_user_resources(){
      let resp = await api.get('/common/resources/?user_id='+this.user.id)
      this.resources = resp.data
    }
  }
})
