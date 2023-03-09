<template>
  <div>
    <h2>Catalogo Disegni</h2>

    <q-table
      flat
      :rows="disegni"
      row-key="fronte"
      :columns="columns"
      :pagination="pagination"
      :filter="filter"
      :hide-header="hideHeader"
      dense
      :grid="grid"
      class="q-ma-none"
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
            <q-icon name="close" @click="filter = ''" class="cursor-pointer" />
            <q-icon name="mdi-filter-outline" />
          </template>
        </q-input>
      </template>
      <template #body-cell-fronte="{ row }">
        <!-- fronte -->
        <q-td :key="`f${row.id}`">
          <img :src="row.fronte_thumb" />
        </q-td>
      </template>
      <template #body-cell-retro="{ row }">
        <!-- fronte -->
        <q-td :key="`r${row.id}`">
          <img :src="row.retro_thumb" />
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
</template>

<script setup lang="ts">
import { useDisegnoStore } from '../stores/disegni'
import { onMounted, ref, computed } from 'vue'
// import { useRouter } from 'vue-router'
import DisegnoDetailCard from '../components/DisegnoDetailCard.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const disegnoStore = useDisegnoStore()
const filter = ref<string>('')
// const activateTeleport = ref(0)
// const router = useRouter()
const grid = ref<boolean>(true)

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
  },
  {
    label: 'titolo',
    name: 'titolo',
    field: 'titolo',
    align: 'left',
    sortable: true,
  },
  {
    label: 'collocazione',
    name: 'collocazione_nome',
    field: 'collocazione_nome',
    align: 'left',
    sortable: true,
  },
]
const pagination = {
  sortBy: 'id',
  descending: false,
  // page: number,
  rowsPerPage: 30,
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
  // for (let key in route.query) {
  //   if (key.match(/^filter_collocazioni$/)) {
  //     console.log('collocazioni'); // Output: "pdf", "csv"
  //     let value = route.query[key]
  //     return disegnoStore.disegni.filter(item => {
  //       item.collocazione === value
  //     }
  //   }
  return disegnoStore.disegni
})

// function showDetail(id: string) {
//   router.push(`/disegni/${id}`)
// }
onMounted(() => {
  // activateTeleport.value = 1
  disegnoStore.getList()
  console.log('filter:', route.query)
})
</script>

<style scoped></style>
