<template>
  <h1>Autori</h1>
  <div class="column items-left">
    <div id="lettere" class="q-my-lg">
      <span
        v-for="(lettera, idx) in store.lettere"
        class="lettera cursor-pointer"
        :key="idx"
        @click="scrollToElement(lettera)"
        >{{ lettera }}
      </span>
    </div>
    <div
      id="autori-items"
      class="scroll overflow-auto"
      style="height: 80vh; position: relative"
    >
      <section
        v-for="lettera in store.lettere"
        :key="lettera"
        :ref="
          (el) => {
            refs[lettera] = el
          }
        "
      >
        <h1>
          <a :name="lettera">{{ lettera }}</a>
        </h1>
        <q-list>
          <q-expansion-item
            v-for="(item, idx) in store.grouped[lettera]"
            :key="`${lettera}-${idx}`"
            :expand="!item.descrizione"
          >
            <template v-slot:header>
              {{ item.nome }} <q-space /> <span v-if="item.descrizione">*</span>
            </template>
            <q-card v-if="item.descrizione">
              <q-card-section />
              <div v-html="item.descrizione"></div>
            </q-card>
          </q-expansion-item>
        </q-list>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { scroll } from 'quasar'
import { onMounted, reactive } from 'vue'
import { useAutoreStore } from '../stores/autori'
const { getScrollTarget, setVerticalScrollPosition } = scroll
// takes an element object

const store = useAutoreStore()
const refs = reactive({})
onMounted(() => {
  store.getList()
})
function scrollToElement(letter: string) {
  const el = refs[letter as keyof typeof refs] as HTMLBaseElement
  // let scrollEl = el.closest('.scroll')
  const target = getScrollTarget(el)
  const offset = el.offsetTop // - scrollEl.offsetTop
  const duration = 100
  // console.log('scrollElement', scrollEl, scrollEl.offsetTop)
  // console.log('offsetParent:', el.offsetParent, el.offsetParent.offsetTop)

  setVerticalScrollPosition(target, offset, duration)
}
</script>

<style lang="sass" scoped>
.lettera
  color: #A52A2A
  padding: 5px
  font-weight: bold
  font-size: 120%

.q-item
  padding: 2px 16px

.q-card__section--vert
  padding-left: 0px

>>> #architetti-items .q-list p
  margin-top: .6rem
</style>
