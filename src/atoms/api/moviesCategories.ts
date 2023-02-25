import { atom, useAtom } from 'jotai'
import { atomsWithQuery } from 'jotai-tanstack-query'
import { selectedAccountAtom } from '../accounts/accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { ICategory } from './types'
import { IInfoMovieData, IMovie } from './moviesTypes'

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

export const useFocusMovieId = () => useAtom(focusMovieIdAtom)

const [_2, statusMovieDetailsAtom] = atomsWithQuery((get) => ({
  queryKey: ['moviesDetails', get(focusMovieIdAtom)],
  queryFn: async ({ queryKey: [, id] }) => {
    const selectedAccount = get(selectedAccountAtom)
    if (!selectedAccount) {
      return
    }
    const res = await fetch(
      buildApiUrl(selectedAccount, ['get_vod_info', 'vod_id=%sid%s'], id),
      fetchConfig
    )
    return res.json()
  },
}))

export const useMoviesVodCategories = () => {
  const [status] = useAtom(statusMoviesVodCategoriesAtom)
  const data = status.data?.length > 5 ? status.data.slice(0, 6) : []
  return {
    data: data as ICategory[],
    isLoading: status.isLoading,
  }
}

export const useMovieDetails = () => {
  const [status] = useAtom(statusMovieDetailsAtom)
  return {
    data: status.data as IInfoMovieData | undefined,
    isLoading: status.isLoading,
  }
}
