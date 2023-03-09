<template>
  <h1>Collocazioni</h1>
  <hr />
  <div class="column items-left">
    <div class="collocazioni" v-for="(item, idx) in store.list" :key="idx">
      <a :href="`/disegni/${item.id}/`">{{ item.nome }}</a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useCollocazioneStore, Collocazione } from '../stores/collocazioni'
// takes an element object

let colls = reactive([])

const store = useCollocazioneStore()
onMounted(() => {
  // colls = store.getList()
  store.getList()
})
</script>

<style lang="sass" scoped>
.lettera
  color: #A52A2A
  padding: 5px
  font-weight: bold
  font-size: 120%

.q-item
  padding: 2px 16px

.q-card__section--vert
  padding-left: 0px

>>> #architetti-items .q-list p
  margin-top: .6rem
</style>
