<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
        />

        <PlayerPanel />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useBeliefStore } from 'stores/belief'
import PlayerPanel from 'src/components/PlayerPanel.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    PlayerPanel
  },

  setup () {

    const store = useBeliefStore()
    return {
      store
    }
  }
})
</script>
