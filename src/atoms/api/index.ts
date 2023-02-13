import { atom, useAtom } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { selectedAccountAtom } from '../accountsAtom'
import { buildPlayerUrl } from './utils'

const [vodCategoriesAtom] = atomsWithQuery((get) => ({
  queryKey: ['vodCategories', get(selectedAccountAtom)],
  queryFn: async ({ queryKey: [] }) => {
    const selectedAccount = get(selectedAccountAtom)
    if (!selectedAccount) {
      return
    }
    const res = await fetch(
      buildPlayerUrl(selectedAccount, 'get_vod_categories')
    )
    return res.json()
  },
}))

const useVodCategories = () => {
  const [data] = useAtom(vodCategoriesAtom)
  return data
}
