import { useSelectedAccount } from '../accounts/accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { IMovie } from './moviesTypes'
import { useEffect, useState } from 'react'

export const useMoviesByCategoryId = (catId: string) => {
  const [loading, setLoading] = useState(true)
  const [moviesByCatId, setMoviesByCatId] = useState<IMovie[]>([])
  const { account } = useSelectedAccount()

  useEffect(() => {
    setLoading(true)
    const fetchAsync = async () => {
      if (!account) {
        return
      }

      const data: IMovie[] = await fetch(
        buildApiUrl(account, ['get_vod_streams', 'category_id=%sid%s'], catId),
        fetchConfig
      )
        .then((res) => res.json())
        .finally(() => setLoading(false))

      setMoviesByCatId(data)
    }
    fetchAsync()
  }, [catId])

  return {
    movies: moviesByCatId,
    loading,
  }
}
