<template>
  <h1>Titolo</h1>
  <disegno-detail-card :item="item" :mini="false" full></disegno-detail-card>
</template>

<script setup lang="ts">
import { Disegno, useDisegnoStore } from '../stores/disegni'
import { computed, onMounted } from 'vue'
import DisegnoDetailCard from '../components/DisegnoDetailCard.vue'

interface Props {
  // item: Disegno
  id: string
}

const disegnoStore = useDisegnoStore()
const props = defineProps<Props>()

const item = computed(() => {
  return disegnoStore.find(props.id) as Disegno
})
onMounted(() => {
  disegnoStore.getList()
})
</script>

<style scoped>
.q-dialog__inner--minimized > div {
  max-width: 1960px;
}
</style>
