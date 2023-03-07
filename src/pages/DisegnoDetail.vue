<template>
  <q-dialog v-model="dialog" @hide="onHide" :maximized="maximized">
    <q-card id="content" class="q-pa-lg">
      <q-card-section>
        <div class="row no-wrap q-gutter-sm">
          <q-img :src="item.fronte" style="max-width: 600px" />
          <q-img :src="item.retro" style="max-width: 600px" />
        </div>
        <div class="text-h6">{{ item.titolo }}</div>
        <div class="text-subtitle2">{{ item.autore_nome }}</div>
        <div class="text-subtitle2">{{ item.collocazione_nome }}</div>
        <div class="text-subtitle4" v-html="item.descrizione"></div>
      </q-card-section>
      <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2"> </q-card-section>
        </div>
      </q-slide-transition>

      <q-card-actions align="right" class="text-primary">
        <div class="text-subtitle4" v-html="item.descrizione"></div>
        <q-btn flat label="Maximize" @click="toggleMax()" />
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useDisegnoStore } from '../stores/disegni'
import { useQuasar } from 'quasar'
import { Disegno } from '../stores/disegni'
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'

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
function toggleMax() {
  force_max.value = !force_max.value
}
function onHide() {
  router.push('/disegni')
}

onMounted(() => {
  dialog.value = true
})
</script>

<style scoped></style>
