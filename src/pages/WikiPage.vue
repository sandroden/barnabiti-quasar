<template>
  <q-page class="column constrained-page q-pt-xl">
    <div>
      <template v-if="props.slug">
        <wiki-section :slug="props.slug" single />
      </template>
      <template v-else>
        <slot name="default"> </slot>
      </template>
    </div>
  </q-page>
</template>

<script setup lang="ts">
// import { storeToRefs } from 'pinia'
import { usePageStore } from 'stores/pages'
// import { Page } from 'components/models'
// import { ref } from 'vue'
import { onMounted } from 'vue'
import WikiSection from '../components/WikiSection.vue'

interface Props {
  slug: string
  title?: string
}
const props = defineProps<Props>()

const pageStore = usePageStore()
// const pages = ref<Page[]>(pagesStore.getList())
// const { pages } = storeToRefs(pageStore.pages)

onMounted(() => {
  pageStore.getList()
})
</script>
