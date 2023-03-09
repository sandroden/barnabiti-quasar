import { defineStore } from 'pinia'
import { api } from 'boot/axios'
// import { Content } from 'src/stores/models'

export interface Collegio {
  id: string
  nome: string
  descrizione: string
}

export const useCollegioStore = defineStore('collegi', {
  state: () => ({
    apiUrl: '/collegi/',
    pk: <string>'',
    list: [] as Collegio[],
    detail: {} as Collegio,
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

      if (pk in state.byPk) {
        return state.byPk[pk as keyof typeof state.byPk] as Collegio
      } else {
        return {}
      }
    },
    // Return a list of articles in the order of `allIds`.
    /*   list(): string[] {
      return this.allPks.map((pk: string) => this.find(pk))
    },
   */ getDetail(state) {
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
        const url = `${this.apiUrl}`
        const result = await api.get(url)
        this.list = result.data
        this.setAllByPk()
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    setAllByPk() {
      const byPk: object = {}
      const allPks: string[] = []
      this.list.forEach((item: Collegio) => {
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
