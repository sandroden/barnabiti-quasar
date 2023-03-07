<template>
  <q-dialog v-model="dialog" @hide="onHide" :maximized="maximized">
    <disegno-detail-card
      :item="item"
      :mini="false"
      full
      @maximize-dialog="onMaximizeDialog()"
    ></disegno-detail-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDisegnoStore } from '../stores/disegni'
import { useQuasar } from 'quasar'
import { Disegno } from '../stores/disegni'
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import DisegnoDetailCard from '../components/DisegnoDetailCard.vue'

interface Props {
  // item: Disegno
  id: string
}

const disegnoStore = useDisegnoStore()
const props = defineProps<Props>()

const dialog = ref(false)
const $q = useQuasar()
const force_max = ref<bool>(false)
const router = useRouter()
const expanded = ref(false)
const maximized_debug = $q.screen.lt.md
const maximized_request = ref<boolean>(false)
const maximized = computed(() => {
  return force_max.value || $q.screen.lt.md
})
const item = computed(() => {
  return disegnoStore.find(props.id) as Disegno
})
function onMaximizeDialog() {
  console.log('receiving maximize-dialog')

  force_max.value = !force_max.value
}
function onHide() {
  router.push('/disegni')
}

onMounted(() => {
  dialog.value = true
})
</script>

<style scoped>
.q-dialog__inner--minimized > div {
  max-width: 1960px;
}
</style>
