import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { runInThisContext } from 'vm'

// import { Content } from 'src/stores/models'

export interface Autore {
  id: string
  nome: string
  descrizione: string
}

export const useAutoreStore = defineStore('autori', {
  state: () => ({
    apiUrl: '/autori',
    pk: <string>'',
    list: [] as Autore[],
    detail: {} as Autore,
    // not used in Architetti (sforza)
    filters: <object>{},
    // an object indexed by letter key: letter, value :list of Authors
    // grouped['A'] = [auth1, auth2, ...]
    grouped: <object>{},
    errors: [],
    // not used in Architetti
    page: {},
    perPage: 10,
    pageOptions: <object>{},
    orderBy: null,
    allPks: <string[]>[],
    byPk: <object>{},
    lettere: <string[]>[],
  }),
  getters: {
    find: (state) => (pk: string) => {
      // Swap ID references with the resolved author objects.

      if (pk in state.byPk) {
        return state.byPk[pk as keyof typeof state.byPk] as Autore
      } else {
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
    add: (state, item) => {
      const pk = item[state.pk]
      state.byPk[pk] = item
      if (!state.allPks.includes(pk)) {
        state.allPks[state.allPks.length] = pk
      }
    },
    async getListOld() {
      try {
        const result = await api.get('/autori')
        this.list = result.data
        this.setAllByPk()
      } catch (error) {
        alert(error)
        console.log(error)
      }
    },
    async getList() {
      const url = `${this.apiUrl}/grouped/?`
      // url = `${url}${this.perPage ? 'per_page=' + this.perPage : ''}`
      // url = `${url}${this.page ? '&page=' + this.page : ''}`
      // url = `${url}${this.orderBy ? '&order_by__=' + this.orderBy : ''}`
      for (const key in this.filters) {
        const filterValue = this.filters[key as keyof typeof this.filters]
        url = `${url}${filterValue != null ? `&${key}=${filterValue}` : ''}`
      }
      return api.get(url).then((response) => {
        // django paginated response is an object with keys results, count, next, previous, per_page
        // non paginated response has the result list directly
        // let isPaginated = !Array.isArray(response.data)
        const data = response.data
        this.lettere = []
        for (const [letter, value] of Object.entries(data)) {
          this.grouped[letter] = value
          this.lettere.push(letter)
        }
      })
    },
    setAllByPk() {
      const byPk: object = {}
      const allPks: string[] = []
      this.list.forEach((item: Autore) => {
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
