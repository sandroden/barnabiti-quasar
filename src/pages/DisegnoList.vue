<template>
  <div>
    <h1>Disegni</h1>
    <table>
      <thead>
        <th>Fronte</th>
        <th>Retro</th>
        <th>Autore</th>
        <th>Titolo</th>
        <th>Collocazione</th>
      </thead>
      <tbody>
        <tr v-for="dis in disegni" :key="dis.id">
          <td>
            <img @click="showDetail(dis.id)" :src="dis.fronte_thumb" />
          </td>
          <td>
            <img :src="dis.retro_thumb" />
          </td>
          <td>{{ dis.autore_nome }}</td>
          <td>{{ dis.titolo }}</td>
          <td>{{ dis.collocazione_nome }}</td>
        </tr>
      </tbody>
    </table>

    <router-view />
    <teleport v-if="activateTeleport" to="#searchInput">
      <q-input
        v-model="search"
        placeholder="Cerca"
        label-color="primary"
        dense
        debounce="300"
        clearable
        dark
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { useDisegnoStore } from '../stores/disegni'
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const disegnoStore = useDisegnoStore()
const search = ref<string>('')
const activateTeleport = ref(0)
const router = useRouter()
const grid = ref<boolean>(true)

const disegni = computed(() => {
  if (!!search.value) {
    let searchFilter: string = search.value.toLocaleLowerCase()
    return disegnoStore.disegni.filter(
      (item) =>
        item.titolo.toLocaleLowerCase().includes(searchFilter) ||
        item.autore_nome.toLocaleLowerCase().includes(searchFilter) ||
        item.collocazione_nome.toLocaleLowerCase().includes(searchFilter)
    )
  }
  return disegnoStore.disegni
})
function showDetail(id: string) {
  console.log(`showDetail disegno ${id}`)

  router.push(`/disegni/${id}`)
}
onMounted(() => {
  activateTeleport.value = 1
  disegnoStore.getList()
})
</script>

<style scoped></style>
