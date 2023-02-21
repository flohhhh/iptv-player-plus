import { useAtom } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { selectedAccountAtom } from '../accounts/accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { ICategory } from './types'

const [_, statusAtom] = atomsWithQuery((get) => ({
  queryKey: ['seriesCategories'],
  queryFn: async ({ queryKey: [] }) => {
    const selectedAccount = get(selectedAccountAtom)
    if (!selectedAccount) {
      return
    }
    const res = await fetch(
      buildApiUrl(selectedAccount, ['get_series_categories']),
      fetchConfig
    )
    return res.json()
  },
}))

export const useSeriesCategories = () => {
  const [status] = useAtom(statusAtom)
  const data = status.data?.length > 5 ? status.data.slice(0, 6) : []
  return {
    data: data as ICategory[],
    isLoading: status.isLoading,
  }
}
