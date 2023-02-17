import { useSelectedAccount } from '../accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { IMovie } from './moviesTypes'
import { useEffect, useState } from 'react'

export const useMoviesByCategoryId = (catId: string) => {
  const [moviesByCatId, setMoviesByCatId] = useState<IMovie[]>([])
  const [selectedAccount] = useSelectedAccount()

  useEffect(() => {
    const fetchAsync = async () => {
      if (!selectedAccount) {
        return
      }

      const data: IMovie[] = await fetch(
        buildApiUrl(
          selectedAccount,
          ['get_vod_streams', 'category_id=%sid%s'],
          catId
        ),
        fetchConfig
      ).then((res) => res.json())
      setMoviesByCatId(data)
    }
    fetchAsync()
  }, [catId])

  return moviesByCatId
}
