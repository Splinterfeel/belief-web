<template>
    <div class="tile">
      <q-img v-if="type" class="filled_tile"
        :src="'/src/assets/'+type.icon_name+'.png'"
        :alt="'/src/assets/'+type.icon_name+'.png'"/>
      <q-img v-else-if="queued_task" class="queued_building_tile"
        src="/src/assets/hammer.png"
        alt="/src/assets/hammer.png"/>
      <div v-else class="empty_tile" ></div>
    </div>
</template>
  
<script>
  import { defineComponent, ref } from 'vue'
  
  
  export default defineComponent({
    name: 'Tile',
    props: {
      type: {
        type: Object,
        required: false,
        default: null
      },
      queued_task: {
        type: Object,
        required: false,
        default: null
      },
    },
    components: {
    },
    data() {
      return {
        src: './icons.png'
      };
    },
    mounted: function(){
    },
    computed: {
    },
    methods: {
    },
  })
</script>
<style>
.tile {
  margin: 0;
  border: 1px solid #394448;
  width: 100px;
  height: 100px;
}
.filled_tile {
  background-color: rgb(160, 210, 155);
  cursor: pointer;
}
.empty_tile {
  background-color: rgb(229, 241, 174);
  width: 100%;
  height: 100%;
}
.queued_building_tile {
  background-color: rgb(160, 210, 155);
  cursor: pointer;
  width: 100%;
  height: 100%;
}
</style>