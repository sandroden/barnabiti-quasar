import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { Content } from 'src/stores/models'

export interface Disegno {
  id: string
  pk: string
  autore: string
  autore_nome: string
  titolo: string
  datazione: string
  collegio: string
  collocazione: string
  collocazione_nome: string
  fronte: string
  retro: string
  descrizione: string
  fronte_thumb: string
  retro_thumb: string
}

export const useDisegnoStore = defineStore('disegni', {
  state: () => ({
    apiUrl: '/disegni',
    pk: <string>'',
    disegni: [] as Disegno[],
    detail: {} as Disegno,
    filters: '',
    errors: [],
    page: {},
    perPage: 10,
    pageOptions: <object>{},
    orderBy: null,
    allPks: <string[]>[],
    byPk: <object>{},
  }),
  getters: {
    find: (state) => (pk: string) => {
      // Swap ID references with the resolved author objects.
      console.log(`disegni.find(${pk})`)
      if (pk in state.byPk) {
        console.log(state.byPk[pk as keyof typeof state.byPk])
        return state.byPk[pk as keyof typeof state.byPk] as Disegno
      } else {
        console.log(`id ${pk} non trovata in`, state.byPk)
        return {}
      }
    },
    // Return a list of articles in the order of `allIds`.
    list(): string[] {
      return this.allPks.map((pk: string) => this.find(pk))
    },
    getDetail(state) {
      return state.detail
    },
    // filters(state) {
    //   return state.filters
    // },
    // errors(state) {
    //   return state.errors
    // },
    // page(state) {
    //   return state.page
    // },
    // perPage(state) {
    //   return state.perPage
    // },
    // pageOptions(state) {
    //   return state.pageOptions
    // },
    // orderBy(state) {
    //   return state.orderBy
    // },
  },
  actions: {
    async getList() {
      try {
        const result = await api.get(`${this.apiUrl}/`)
        this.disegni = result.data
        this.setAllByPk()
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    setAllByPk() {
      const byPk: object = {}
      const allPks: string[] = []
      this.disegni.forEach((item: Disegno) => {
        byPk[item.id as keyof typeof byPk] = item
        allPks.push(item.id)
      })
      // for (const x of this.pages) {

      // }
      this.byPk = byPk
      this.allPks = allPks
    },
  },
})
