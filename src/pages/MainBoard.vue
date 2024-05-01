<template>
  <q-page>
    <div class="row">
      <div class="col" style="border: 3px solid black">left col</div>
      <div class="board col">
        <Tile v-for="i in cells" :icon="i" @click="tile_click(i)" />
      </div>
      
      <div class="col" style="border: 3px solid black">right col</div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useBeliefStore } from 'stores/belief'
import { storeToRefs } from 'pinia'
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import Tile from 'src/components/Tile.vue'

const store = useBeliefStore()

export default defineComponent({
  name: 'MainBoard',
  components: { Tile,  },
  data() {
    return {
      cells: [
        null, 'castle', null, 'barracks', null,
        null, null, null, null, 'residence',
        null, null, null, 'shooting_range', null,
        null, 'church', null, null, null,
        null, null, null, null, null],
    };
  },
  mounted: function(){
  },
  computed: {
  },
  methods: {
    tile_click(index){
      console.log('clicked '+index)
    }
  },
})
</script>
<style>
.board {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  width: 505px;
}
</style>