<template>
  <q-page class="row constrained-page">
    <div class="column items-center">
      <div class="q-my-md">
        <q-input
          class="search-input"
          v-model="search"
          debounce="500"
          filled
          autofocus
          bg-color="brown-1"
          placeholder="cerca"
          :hint="`Totale risultati: ${search_results.length}`"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
          <template v-slot:append>
            <q-icon name="close" @click="search = ''" class="cursor-pointer" />
          </template>
        </q-input>
      </div>
      <div
        class="scroll overflow-auto q-mx-lg"
        style="height: 80vh; position: relative"
      >
        <section
          class="q-mt-lg q-pr-lg"
          v-for="(item, j) in search_results"
          :key="j"
        >
          <div class="text-subtitle1">
            {{ item.model }}:
            <!-- <a href="#" @click.stop="show(item)">{{item.title}}</a> -->
            <span
              class="text-weight-bold cursor-pointer titolo"
              @click="show(item)"
              >{{ item.title }}</span
            >
          </div>
          <div v-html="item.abstract" />
        </section>
      </div>
    </div>
    <SearchDetail ref="detailDialog" :item="item" :keywords="keywords" />
  </q-page>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import SearchDetail from './SearchDetail.vue'
import { SearchResult } from '../stores/search-result'
import { api } from 'boot/axios'
// import console from 'console'

const search = ref('')
const search_results = ref<SearchResult[]>([])
const item = ref<SearchResult | null>(null)
const keywords = ref<string[]>([])
const detailDialog = ref<typeof SearchDetail | null>(null)
// const searchResultStore = useSearchResultStore()

const show = (result: SearchResult) => {
  item.value = result

  console.log('show fromSearchPage: detailDialog:', detailDialog.value?.value)
  detailDialog.value.show(keywords)
}

/* const searchItems = () => {
  if (!search.value.trim().endsWith('|')) {
    // Esegui la tua richiesta axios qui
    // this.$axios.get(`/search_fts/?q=${this.search}`).then(...)
  }
} */
// Fetch search results when search query changes
watch(search, (value) => {
  if (!value.trim().endsWith('|')) {
    api.get(`/search_fts/?q=${value}`).then((response) => {
      search_results.value = response.data.results
      keywords.value = response.data.keywords
      console.log('keywords in watch:', keywords.value)
    })
  }
})
/* watch(search, () => {
  searchItems()
}) */
</script>

<style lang="sass" scoped>

.search-input
  min-width: 500px
.constrained-page a:visited, .titolo
  color: brown
</style>
