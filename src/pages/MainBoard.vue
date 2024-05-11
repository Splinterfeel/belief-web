<template>
  <q-page>
    <div class="row">
      <div class="col">
        <!-- левая колонка -->
        <q-card class="left_card">
          <q-select filled :options="user_strongholds" label="Крепость"
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
        <!-- правая колонка -->
        <q-card class="right_card">
          <div v-if="selected_building">
            <span v-if="selected_building.building_type">
              <!-- есть построенное здание -->
              <div class="text-h6">{{ selected_building.building_type.name }}</div>
              <p>{{ selected_building.level }} уровень</p>
              <p>{{ selected_building.building_type.description }}</p>
              <q-separator />
            </span>
            <span v-else-if="selected_building.queued_task">
              <!-- есть здание в очереди постройки -->
              <div class="text-h6">{{ selected_building.queued_task.building_type.name }} (строится)</div>
              <p>{{ selected_building.level }} уровень</p>
              <p>{{ selected_building.queued_task.building_type.description }}</p>
              <p>Когда построится: {{ selected_building.queued_task.scheduled_at }}</p>
              <q-separator />
            </span>
            <span v-else>
              <!-- пустая ячейка -->
              <div class="text-h6">Построить здание</div>
              <q-select filled :options="build_new.building_types" v-model="build_new.selected_type"
                option-label="name" option-value="id" label="Выберите здание для постройки"
                @update:model-value="get_building_price(type=build_new.selected_type.id, level=1)" />
              <div v-if="build_new.selected_type">{{ build_new.selected_type.description }}</div>
              <q-separator />
              <span v-if="build_new.price">
                <div class="text-h6">Стоимость постройки</div>
                <p>Золото: {{ build_new.price.gold }} ед.</p>
                <p>Продовольствие: {{ build_new.price.food }} ед.</p>
                <p>Сырье: {{ build_new.price.materials }} ед.</p>
                <p>Население: {{ build_new.price.population }} ед.</p>
                <p>Время постройки: {{ build_new.price.time }} мин.</p>
                <q-btn color="primary" label="Построить"
                    @click="build_new_building(selected_building.cell, build_new.selected_type)" />
              </span>
            </span>

            <!-- общее -->
            <q-separator />
            <p>Ячейка: {{ selected_building.cell }}</p>
          </div>
          <div v-else>Выберите ячейку для отображения информации</div>
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
      selected_building: null,
      build_new: {
        building_types: [], // типы зданий для постройки
        selected_type: null,
        price: null
      },
    };
  },
  mounted: function(){
    store.get_user_strongholds(store.user.id).then((resp)=>{
      this.user_strongholds = resp
    })
    store.get_building_types().then((resp)=>{
      this.build_new.building_types = resp
    })

  },
  computed: {
  },
  methods: {
    build_new_building(cell, type){
      console.log('building new '+ type.id + ', cell '+ cell)
      api.post('/strongholds/building', {
          user_id: store.user.id,
          stronghold_id: this.selected_stronghold.data.id,
          building_type_id: type.id,
          cell: this.selected_building.cell,
          level: 1,
          is_upgrade: false
        }).then((resp)=>{
          if (resp.data.successful == true){
            Notify.create({message: 'Постройка начата', color: 'green'})
            this.get_stronghold( this.selected_stronghold.data.id)
          }
          else {
            Notify.create({message: resp.data.description, color: 'red'})
          }
        })
    },
    get_stronghold(id){
      store.get_stronghold(id).then((resp)=>{
        this.selected_stronghold.data = resp
      })
    },
    tile_click(building){
      this.selected_building = building
      console.log(building)
    },
    get_building_price(type, level){
      this.build_new.price = null
      store.get_building_price(type, level).then((resp)=>{
        this.build_new.price = resp
      })
      // console.log(this.build_new.selected_type)
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