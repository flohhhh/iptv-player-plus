import { atom, useAtom } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { selectedAccountAtom } from '../accounts/accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { ICategory } from './types'

const [_1, statusMoviesVodCategoriesAtom] = atomsWithQuery((get) => ({
  queryKey: ['moviesVodCategories'],
  queryFn: async ({ queryKey: [] }) => {
    const selectedAccount = get(selectedAccountAtom)
    if (!selectedAccount) {
      return
    }
    const res = await fetch(
      buildApiUrl(selectedAccount, ['get_vod_categories']),
      fetchConfig
    )
    return res.json()
  },
}))

const focusMovieIdAtom = atom<number>(-1)
export const useFocusMovieId = () => {
  const [focusMovieId, setFocusMovieId] = useAtom(focusMovieIdAtom)
  return { focusMovieId, setFocusMovieId }
}

export const useMoviesVodCategories = () => {
  const [status] = useAtom(statusMoviesVodCategoriesAtom)
  const data = status.data?.length > 5 ? status.data : []
  return {
    data: data as ICategory[],
    isLoading: status.isLoading,
  }
}
