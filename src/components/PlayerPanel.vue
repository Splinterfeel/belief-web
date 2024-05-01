<template>
    <div class="player_panel" v-if="store.user.logged_in">
        <q-btn style="width: 100%;" dense :label="store.user.name" @click="show_player_dialog=true" />
    </div>
    <div class="player_panel" v-else></div>
  

    <q-dialog v-model="show_player_dialog">
      <q-card dark bordered class="player_dialog">
        <q-card-section class="col-5 flex">Логин: {{ store.user.name }}</q-card-section>
        <q-separator spaced class="bg-dark-separator" />
        <q-card-section class="col-5 flex">Баланс: 0</q-card-section>
        <q-separator spaced class="bg-dark-separator" />
        <q-card-actions align="right">
          <q-btn flat icon="logout" v-close-popup @click="logout()" />
        </q-card-actions>
        <q-card-actions align="right">
          <q-btn flat icon="close" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>
  
<script>
import { defineComponent, ref } from 'vue'
import { useBeliefStore } from 'stores/belief'
const store = useBeliefStore()

  export default defineComponent({
    name: 'PlayerPanel',
    props: {
    },
    components: {
    },
    data() {
      return {
        show_player_dialog: false,
        store
      };
    },
    mounted: function(){
    },
    computed: {
    },
    methods: {
      logout() {
        store.logout()
        this.$router.push('/')
      }
    },
  })
</script>
<style>
.player_panel {
  margin-left: 2vh;
  /* justify-content: right; */
  width: 200px;
  /* height: 20px; */
}
.player_dialog {
  padding: 3vh;
  width: 100vh;
  height: 80vh;
}
</style>