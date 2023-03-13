import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { Content } from 'src/stores/models'

export const usePageStore = defineStore('pages', {
  state: () => ({
    apiUrl: '/pages',
    pk: <string>'',
    pages: [] as Content[],
    detail: {} as Content,
    filters: '',
    errors: [],
    page: {},
    perPage: 10,
    pageOptions: {},
    orderBy: null,
    allPks: <string[]>[],
    byPk: {},
  }),
  getters: {
    find: (state) => (pk: string) => {
      // Swap ID references with the resolved author objects.
      console.log(`content find , pk=${pk}`)

      if (pk in state.byPk) {
        return state.byPk[pk] as Content
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
    async getList(forceReload?: boolean) {
      // by default don't getdata if you already have some
      if (forceReload || !this.pages.length) {
        try {
          const result = await api.get(this.apiUrl)
          this.pages = result.data
          this.setAllByPk()
        } catch (error) {
          alert(error)
          console.log(error)
        }
      }
    },
    setAllByPk() {
      const byPk: object = {}
      const allPks: string[] = []
      this.pages.forEach((item: Content) => {
        byPk[item.slug] = item
        allPks.push(item.slug)
      })
      // for (const x of this.pages) {

      // }
      this.byPk = byPk
      this.allPks = allPks
    },
  },
})
