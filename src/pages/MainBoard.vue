<template>
  <q-page>
    <div class="row">
      <div class="col">
        <!-- left col -->
        <q-card class="left_card">
          <q-select :options="user_strongholds" label="Крепость"
          option-value="id" option-label="name" v-model="selected_stronghold.select_model"
          @update:model-value="get_stronghold(selected_stronghold.select_model.id)" />
        </q-card>
      </div>
      <div class="col">
        <div class="board" v-if="selected_stronghold.data.buildings.length">
          <Tile v-for="building in selected_stronghold.data.buildings"
            :type="building.building_type" @click="tile_click(building)"
            :queued_task="building.queued_task"/>
        </div>
        <div v-else class="board">Выберите крепость</div>
      </div>
      <div class="col">
        <!-- right col -->
        <q-card class="right_card">
123
        </q-card>
      </div>
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
      user_strongholds: [],
      selected_stronghold: {
        select_model: null,
        data: {
          buildings: []
        },
      },
    };
  },
  mounted: function(){
    store.get_user_strongholds(store.user.id).then((resp)=>{
      this.user_strongholds = resp
    })
  },
  computed: {
  },
  methods: {
    get_stronghold(id){
      store.get_stronghold(id).then((resp)=>{
        this.selected_stronghold.data = resp
      })
    },
    tile_click(building){
      console.log(building)
    }
  },
})
</script>
<style>
.board {
  margin-top: 1vh;
  display: flex;
  flex-wrap: wrap;
  width: 505px;
  height: 505px;
}
.left_card {
  padding: 1vh;
  margin-right: 2vh;
  height: 515px;
}
.right_card {
  padding: 1vh;
  margin-left: 1vh;
  padding-left: 2vh;
  height: 515px;
}
</style>