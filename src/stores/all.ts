import { usePageStore } from './pages'

const pageStore = usePageStore()

const mapStores = {
  pages: pageStore,
}

export default mapStores
