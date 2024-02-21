<template>
  <q-dialog
    v-if="props.item"
    v-model="dialog"
    @show="onShow"
    @hide="dialog = false"
    :maximized="$q.screen.lt.md"
  >
    <q-card ref="card" id="content" class="q-pa-lg">
      <q-card-actions align="right">
        <q-btn flat icon="close" v-close-popup clickable></q-btn>
      </q-card-actions>
      <q-card-section class="row justify-between">
        <h1>{{ props.item.title }}</h1>
      </q-card-section>
      <q-card-section class="row q-col-gutter-lg">
        <div class="col-xs-12" v-html="props.item.description" />
        <div>Testo per presenza</div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="close" v-close-popup clickable></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup lang="ts">
import { onMounted, ref, defineExpose } from 'vue'
import Mark from 'mark.js'
import { SearchResult } from '../stores/search-result'
import { useQuasar } from 'quasar'
import { log } from 'console'

const $q = useQuasar()
// Define props and reactive state variables

const props = defineProps<{
  item?: SearchResult
}>()

const dialog = ref(false)
// const highlightedHtml = ref('')
const markOptions = ref({
  accuracy: 'complementary',
  ignoreJoiners: true,
  acrossElements: true,
})
const keywords = ref(<string[]>[])

// Import functions for reactivity and lifecycle hooks

// Define methods
const show = (keywords: string[]) => {
  keywords.value = keywords // Assuming keywords is a ref
  console.log('show: keywords:', keywords.value)
  dialog.value = true
}
const onShow = (ev: unknown) => {
  console.log('onShow', ev)
  console.log('keyword.value: ', keywords.value, ' --- ', markOptions.value)
  // performMark('#content', keywords.value, markOptions.value)
}
const performMark = (selector: string, keywords: string[], options: any) => {
  const markInstance = new Mark(document.querySelector(selector))
  console.log('Selector', document.querySelector(selector))
  console.log('markInstance', markInstance)

  markInstance.unmark({
    done: () => {
      markInstance.mark(keywords, options)
    },
  })
}
defineExpose({
  show,
})

// Use onMounted for the onShow logic
onMounted(() => {
  console.log('onShow')
  performMark('#content', keywords.value, markOptions.value)
})
</script>

<style lang="sass" scoped>

h1
    color: brown
    font-size: 1,7rem

@media (min-width: 1024px)
    #content
      width: 1200px
      max-width: 80vw

mark
  background-color: yellow
</style>
