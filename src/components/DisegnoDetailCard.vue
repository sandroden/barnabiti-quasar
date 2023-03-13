<template>
  <div>
    <q-card class="q-pa-sm">
      <q-card-section>
        <div class="row no-wrap q-gutter-sm" @click="showDetail(item.id)">
          <template v-if="props.mini">
            <q-img
              :src="item.fronte_thumb"
              :style="`max-width: ${dim}px`"
              class="lettera cursor-pointer self-stretch"
            />
            <q-img
              :src="item.retro_thumb"
              :style="`max-width: ${dim}px`"
              class="lettera cursor-pointer self-stretch"
            />
          </template>
          <template v-else>
            <a :href="item.fronte" target="_blank" :style="`width: ${dim}px`">
              <q-img :src="item.fronte" :style="`max-width: ${dim}px`" />
            </a>
            <a :href="item.retro" target="_blank" :style="`width: ${dim}px`">
              <q-img :src="item.retro" :style="`max-width: ${dim}px`" />
            </a>
          </template>
        </div>
        <div class="text-subtitle1 text-weight-medium">{{ item.titolo }}</div>
        <div class="text-subtitle1 text-accent">{{ item.autore_nome }}</div>
        <div class="text-subtitle2">
          {{ item.collocazione_nome }}
        </div>
        <div v-if="full" v-html="item.descrizione"></div>
      </q-card-section>
      <!-- <q-slide-transition>
        <div v-show="expanded">
          <q-separator />
          <q-card-section class="text-subitle2"> </q-card-section>
        </div>
      </q-slide-transition> -->

      <q-card-actions v-if="!props.mini" align="right" class="text-primary">
        <q-btn flat label="Max" @click="toggleMax()" />
        <q-btn flat label="Close" v-close-popup />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Disegno } from '../stores/disegni'
import { useRouter } from 'vue-router'
// import { defineEmits } from 'vue'

const emit = defineEmits(['maximize-dialog'])

const router = useRouter()

interface Props {
  item: Disegno
  full?: boolean
  expanded?: boolean
  mini?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  full: false,
  expanded: true,
  mini: true,
})
const dim = computed(() => {
  return props.mini ? 200 : 600
})
function showDetail(id: string) {
  console.log('showDetail + route')

  router.push(`/disegni/${id}`)
}
function toggleMax() {
  emit('maximize-dialog')
}
</script>

<style scoped></style>
