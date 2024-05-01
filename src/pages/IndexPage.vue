<template>
  <q-page>
    <q-card class="fixed-center" style="width: 50vh; height: 16vw">
      <div class="q-gutter-lg" style="padding: 3vh">
        <q-input filled type="text" label="Логин" v-model="login" />
        <q-input filled type="password" label="Пароь" v-model="password" />
        <div class="row q-gutter-x-md" style="justify-content: center;">
          <q-btn color="primary" label="Войти" @click="auth" :disable="!login||!password" />
          <q-btn color="secondary" label="Регистрация" @click="register " :disable="!login||!password" />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useBeliefStore } from 'stores/belief'
import { storeToRefs } from 'pinia'
import { api } from 'boot/axios'
import { Notify } from 'quasar'

const store = useBeliefStore()

export default defineComponent({
  name: 'IndexPage',
  components: {
  },
  data() {
    return {
      login: null,
      password: null,
    };
  },
  mounted: function(){
    if (store.user.logged_in){
      this.$router.push('/main')
    }
  },
  computed: {
  },
  methods: {
    auth(){
      api.post('/common/auth', {login: this.login, password: this.password})
      .then((resp)=>{
        console.log(resp.data)
        if (resp.data.successful){
          store.set_user(resp.data.user.login, resp.data.user.cookie)
          Notify.create({message: 'Логин успешен!'})
        }
        else {
          Notify.create({message: 'Неверный логин или пароль!'})
        }
      })
    },
    register(){
      api.post('/common/user', {login: this.login, password: this.password})
      .then((resp)=>{
        console.log(resp.data)
        if (resp.data == true){
          Notify.create({message: 'Пользователь успешно зарегистрирован!'})
        }
        else {
          Notify.create({message: 'Ошибка. Возможно, такой логин уже существует?'})
        }
      })
    }
  },
})
</script>