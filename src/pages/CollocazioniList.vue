<template>
  <q-page class="column constrained-page">
    <h1>Archivi e Collezioni</h1>
    <hr />
    <div class="column items-left">
      <div class="collocazioni" v-for="(item, idx) in store.list" :key="idx">
        <router-link
          :to="{ path: '/disegni', query: { filter_collocazioni: item.id } }"
        >
          {{ item.nome }}
        </router-link>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCollocazioneStore } from '../stores/collocazioni'
// takes an element object

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

#architetti-items .q-list p
  margin-top: .6rem
</style>
