<template>
  <q-dialog
    v-if="item"
    v-model="dialog"
    @show="onShow"
    @hide="dialog = false"
    :maximized="this.$q.screen.lt.md"
  >
    <q-card ref="card" id="content" class="q-pa-lg">
      <q-card-actions align="right">
        <q-btn flat icon="close" v-close-popup clickable></q-btn>
      </q-card-actions>
      <q-card-section class="row justify-between">
        <h1>{{ item.title }}</h1>
      </q-card-section>
      <q-card-section class="row q-col-gutter-lg">
        <div class="col-xs-12" v-html="item.description" />
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat icon="close" v-close-popup clickable></q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
import Mark from 'mark.js'

export default {
  name: 'SearchDetail',
  props: ['item'],
  data() {
    return {
      dialog: false,
      highlightedHtml: '',
      markOptions: {
        accuracy: 'complementary',
        ignoreJoiners: true,
        acrossElements: true,
      },
    }
  },
  methods: {
    show(keywords) {
      this.keywords = keywords
      this.dialog = true
    },
    onShow(ev) {
      console.log('onShow', ev)
      this.performMark('#content', this.keywords, this.markOptions)
    },
    performMark(selector, keywords, options) {
      var markInstance = new Mark(document.querySelector(selector))
      console.log('Selector', document.querySelector(selector))

      console.log('markInstance', markInstance)

      markInstance.unmark({
        done: function () {
          markInstance.mark(keywords, options)
        },
      })
    },
  },
}
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
  background-color yellow
</style>
