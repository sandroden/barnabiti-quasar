<template>
  <q-page class="row items-center content-start justify-evenly">
    <wiki-section :slug="props.slug" single />
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
}
const props = defineProps<Props>()

const pageStore = usePageStore()
// const pages = ref<Page[]>(pagesStore.getList())
// const { pages } = storeToRefs(pageStore.pages)

onMounted(() => {
  pageStore.getList()
})
</script>
