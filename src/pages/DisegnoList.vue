<template>
  <q-page class="column">
    <h1 class="text-center">Catalogo Disegni</h1>
    <div>
      <q-table
        flat
        :rows="disegni"
        row-key="fronte"
        :columns="columns"
        :filter="filter"
        :pagination="pagination"
        :hide-header="hideHeader"
        dense
        :grid="grid"
        class="q-ma-none"
        virtual-scroll
      >
        <template v-slot:top-right>
          <q-toggle dense v-model="grid" icon="fa fa-th" class="q-mr-lg" />
          <q-input
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Cerca"
          >
            <template v-slot:append>
              <q-icon
                name="close"
                @click="filter = ''"
                class="cursor-pointer"
              />
              <q-icon name="mdi-filter-outline" />
            </template>
          </q-input>
        </template>
        <template #body-cell-fronte="{ row }">
          <!-- fronte -->
          <q-td :key="`f${row.id}`">
            <img
              :src="row.fronte_thumb"
              @click="showDetail(row.id)"
              class="cursor-pointer"
            />
          </q-td>
        </template>
        <template #body-cell-retro="{ row }">
          <!-- fronte -->
          <q-td :key="`r${row.id}`">
            <img
              :src="row.retro_thumb"
              @click="showDetail(row.id)"
              class="cursor-pointer"
            />
          </q-td>
        </template>
        <template v-slot:item="{ row }">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-4 col-lg-3">
            <disegno-detail-card :item="row" mini></disegno-detail-card>
          </div>
        </template>
      </q-table>
      <router-view />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useDisegnoStore } from '../stores/disegni'
import { onMounted, ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
import DisegnoDetailCard from '../components/DisegnoDetailCard.vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const disegnoStore = useDisegnoStore()
const filter = ref<string>('')
// const activateTeleport = ref(0)
// const router = useRouter()
const grid = ref<boolean>($q.screen.lt.md)

const columns = [
  {
    label: '',
    name: 'fronte',
    field: 'fronte',
    align: 'left',
    sortable: false,
  },
  {
    label: '',
    name: 'retro',
    field: 'retro',
    align: 'left',
    sortable: false,
  },
  {
    label: 'autore',
    name: 'autore',
    field: 'autore_nome',
    align: 'left',
    sortable: true,
    style: 'white-space: normal; word-wrap: break-word;',
  },
  {
    label: 'titolo',
    name: 'titolo',
    field: 'titolo',
    align: 'left',
    sortable: true,
    style: 'white-space: normal; word-wrap: break-word;',
  },
  {
    label: 'collocazione',
    name: 'collocazione_nome',
    field: 'collocazione_nome',
    align: 'left',
    sortable: true,
    style: 'white-space: normal; word-wrap: break-word;',
  },
]
const pagination = {
  sortBy: 'id',
  descending: false,
  // page: number,
  rowsPerPage: 50,
  // page: 2
  // totalItems: number"
}
const hideHeader = computed(() => {
  if (grid.value) {
    return true
  }
  return false
})
// const disegni = computed(() => {
//   if (!!filter.value) {
//     let searchFilter: string = filter.value.toLocaleLowerCase()
//     return disegnoStore.disegni.filter(
//       (item) =>
//         item.titolo.toLocaleLowerCase().includes(searchFilter) ||
//         item.autore_nome.toLocaleLowerCase().includes(searchFilter) ||
//         item.collocazione_nome.toLocaleLowerCase().includes(searchFilter)
//     )
//   }
//   return disegnoStore.disegni
// })
const disegni = computed(() => {
  let key = 'filter_collocazioni'
  if (key in route.query) {
    let value = route.query[key]
    console.log(`collocazione=${value}`) // Output: "pdf", "csv"
    return disegnoStore.disegni.filter((item) => item.collocazione == value)
  }
  return disegnoStore.disegni
})
function showDetail(id: string) {
  console.log('showDetail + route')
  router.push(`/disegni/${id}`)
}
// for (let key in route.query) {
//   if (key.match(/^filter_collocazioni$/)) {
//     let value = route.query[key]
//   }
// }) */

// function showDetail(id: string) {
//   router.push(`/disegni/${id}`)
// }
onMounted(() => {
  // activateTeleport.value = 1
  disegnoStore.getList()
  console.log('filter:', route.query)
})
</script>
