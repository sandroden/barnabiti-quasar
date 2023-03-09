<template>
  <h1>Collegi</h1>
  <hr />
  <div class="column items-left">
    <q-list>
      <q-expansion-item v-for="(item, idx) in store.list" :key="idx">
        <template v-slot:header>
          {{ item.nome }} <q-space /> <span v-if="item.descrizione">*</span>
        </template>
        <q-card v-if="item.descrizione">
          <q-card-section />
          <div v-html="item.descrizione"></div>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useCollegioStore } from '../stores/collegi'
// takes an element object

const store = useCollegioStore()
onMounted(() => {
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
