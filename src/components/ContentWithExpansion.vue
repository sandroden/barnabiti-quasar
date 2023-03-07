<template>
  <page :slug="xslug">
    <hr />
    <!-- Come autori del duomo, al click si apre paragrafo -->
    <q-list>
      <q-expansion-item v-for="item in items" :key="item.id">
        <template v-if="slug === 'immaginiduca'" v-slot:header>
          <img :src="item.image" width="50px" class="q-mr-xl" />
          <span class="self-center">{{ getTitle(item) }}</span> <q-space />
        </template>
        <template v-else v-slot:header>
          <span class="data">{{ getData(item) }}</span>
          <span class="title">{{ getTitle(item) }}</span> <q-space />
        </template>
        <q-card>
          <q-card-section class="q-px-lg"
            ><q-img :src="item.image" cover></q-img
          ></q-card-section>
          <q-card-section
            class="q-px-lg"
            v-html="item.contenuto"
          ></q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </page>
</template>

<script setup lan="ts">
import { date } from 'quasar'
import Page from '../pages/WikiPage'
import mapStores from '../stores/all'
import { onMounted, computed } from 'vue'
// import { store } from 'quasar/wrappers'

interface Props {
  slug: string
  model: string
  filter: string
}
const props = defineProps<Props>()

const store = mapStores[props.model]


// const props = defineProps<Props>()

const xslug = computed(() => {
  // filter is a prop betweeb image_choices or statuso_choices
  return props.filter ? `${props.slug}-${props.filter}` : props.slug}
})

const items = computed(() => {
  let result = []
  if (props.slug) {
    result = store.getDetail(this.slug)
    if (props.filter) {
      result = result.filter(item => item.tipo === props.filter)
    }
  }
  return result
})
function getData (item) {
  // data (it) is just to order
  // data_text: a written form
  let label = ''
  if (item.data_text) {
    label = `${item.data_text}`
  } else if (item.data) {
    label = date.formatDate(item.data, 'YYYY, D MMMM', {
      days: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      daysShort: ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato'],
      months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno',
        'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
      monthsShort: ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Sett', 'Ott', 'Nov', 'Dic']
    })
  }
  return label
}
function getTitle (item) {
  // return `<span class="data">${label}</span> <span class="titolo">${item.titolo || item.nome} </span>`
  return `${item.titolo || item.nome || ''}`
}
function fetchList () {
  return this.$store.dispatch(`${this.slug}/getList`)
}


onMounted(() => {
    console.log(`Mounted ContentWithExpansion`, props.slug, props.model)
    store.getList()
  }
  // watch: {
  //   slug: function (oldId, newId) {
  //     this.fetchList()
  //     // console.log('Il buovo valore è', newId)
  //   }
  // }
})
</script>

<style lang="sass" scoped>
>>> .q-item
  padding: 8px 16px 8px 0px

.q-item__label
  font-weight bold

// non funziona!
.q-expansion-item__content
  padding 0 15px
  color red

.q-expansion-item--expanded
  border 1px solid $grey-5

.data
  font-style: italic
  margin-right: 2em

>>> .q-expansion-item--expanded .q-expansion-item__content table
   color: #444
</style>
