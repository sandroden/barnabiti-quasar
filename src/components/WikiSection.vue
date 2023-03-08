<script setup lang="ts">
import { usePageStore } from '../stores/pages'
// import mapStores from '../stores/all'
import { Content } from 'stores/models'
import { onMounted, computed } from 'vue'
// import { defaultDecoder } from 'qs'
import { useQuasar } from 'quasar'
// import { utils } from '../boot/utils'

const $q = useQuasar()
const pageStore = usePageStore()
// const pageStore = mapStores['pages']

// // const elLinks = null
// // const linkList = null
// const $u = utils

interface Props {
  slug: string
  qcardClasses?: string // 'col-xs-12'
  imageClasses?: string // 'col-xs-12 col-sm-6'
  textClasses?: string // 'col-xs-12 col-sm-6'
  buttonText?: string
  buttonTo?: string | object
  bgColor?: string
  single?: boolean
  imgStyle?: object
  reverse?: boolean
  home?: boolean
  contentObj?: Content
}
const props = withDefaults(defineProps<Props>(), {
  qcardClasses: 'col-xs-12',
  imageClasses: 'col-xs-12 col-sm-6',
  textClasses: 'col-xs-12 col-sm-6',
  reverse: false,
  home: false,
  single: false,
})
// function setUpLinks() {
//   const links = this.$refs.mainContent.querySelectorAll('a[href]')
//   const headerHeight = document.querySelector('header')!.offsetHeight
//   for (const x of links) {
//     if (x.pathname === '/') {
//     // FIXME: non funziona da pagina /xxx con target nella home
//       x.onclick = () => {
//         const target = document.querySelector(x.hash)
//         target.style.scrollMarginTop = headerHeight + 'px'
//         target.scrollIntoView(true)
//         return false
//       }
//     }
//   }
//   // this.linkList = links // just for debug
// }
const imgClasses = computed(() => {
  if ($q.screen.width < 600) {
    return 'q-mb-md'
  }
  const cls = `float-${props.reverse ? 'right' : 'left'}`
  if (!props.reverse) {
    return `${cls} q-mr-lg q-mb-lg`
  } else {
    return `${cls} q-ml-lg q-mb-lg col-xs-4`
  }
})
const _imgStyle = computed(() => {
  if ($q.screen.width > 600) {
    return { width: '100%', maxWidth: '400px', ...props.imgStyle }
  } else {
    return { width: '100%' }
  }
})
const _qcardSectionClasses = computed(() => {
  return 'row q-col-gutter-lg' + ` ${props.reverse ? 'reverse' : ''}`
})
const content = computed(() => {
  // contentObj was added later when wikiSection was already working with slug
  // and I needed to make it work form news as well
  // if ($u.ok(props.contentObj)) {
  if (props.contentObj) {
    return props.contentObj as Content
  }
  return pageStore.find(props.slug) as Content
})
const mainContent = computed(() => {
  if (props.home) {
    return content.value.home
  }
  return content.value.body || content.value.content || content.value.testo
})
onMounted(() => {
  // setTimeout(setUpLinks, 500)
  if (!Object.keys(content).length) {
    pageStore.getList()
  }
})
</script>

<template>
  <q-card v-bind="$attrs" class="no-shadow" :class="qcardClasses">
    <slot name="header"></slot>
    <slot name="body" :content="content">
      <q-card-section v-if="content.titolo">
        <h2 class="text-center" v-html="content.titolo"></h2>
      </q-card-section>

      <!-- float img + wrapping text  -->
      <q-card-section v-if="single" class="column">
        <slot name="inner-body" :content="content">
          <div class="single">
            <div
              v-if="content.image"
              :class="[imgClasses, reverse ? 'float-right' : 'float-left']"
              :style="_imgStyle"
            >
              <q-img
                :src="content.image"
                native-context-menu
                :style="_imgStyle"
                ratio="1"
              />
              <span class="caption" v-html="content.caption"></span>
            </div>
            <div ref="mainContent" v-html="mainContent"></div>
            <br clear="all" />
          </div>
          <slot name="button" :content="content">
            <q-btn
              v-if="buttonText"
              class="bg-secondary text-white"
              :to="buttonTo"
            >
              {{ buttonText }}
            </q-btn>
          </slot>
        </slot>
        <slot name="bottom"></slot>
      </q-card-section>

      <!-- 2 columns (image + text w/ button)  -->
      <q-card-section v-else>
        <slot name="inner-body" :content="content">
          <q-card-section :class="_qcardSectionClasses">
            <div :class="imageClasses">
              <q-img :src="content.image" contain native-context-menu />
              <span class="caption" v-html="content.caption"></span>
              <slot name="post-image" :content="content"></slot>
            </div>
            <div :class="textClasses">
              <div ref="mainContent" v-html="mainContent" />
              <slot name="post-text" :content="content"></slot>
              <slot name="button" :content="content">
                <q-btn
                  v-if="buttonText"
                  class="bg-primary text-white"
                  :to="buttonTo"
                >
                  {{ buttonText }}
                </q-btn>
              </slot>
            </div>
          </q-card-section>
        </slot>
        <slot name="bottom"></slot>
      </q-card-section>
    </slot>
  </q-card>
</template>
