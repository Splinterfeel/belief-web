<template>
  <q-page class="flex flex-center">
    <img
      alt="Quasar logo"
      src="~assets/quasar-logo-vertical.svg"
      style="width: 200px; height: 200px"
    >
    {{ store.doubleCount }}
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useBeliefStore } from 'stores/belief';
import { storeToRefs } from 'pinia';

export default {
  setup() {
    const store = useBeliefStore();
    return {
      store
    }
  },
  methods: {
    test(){
      console.log('test')
      this.store.increment()
    }
  },
  mounted() {
    this.test()
  }
}
</script>
