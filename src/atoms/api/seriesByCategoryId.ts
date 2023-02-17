import { useSelectedAccount } from '../accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { useEffect, useState } from 'react'
import { ISerieByCategoryId } from './seriesTypes'

export const useSeriesByCategoryId = (catId: string) => {
  const [seriesByCatId, setSeriesByCatId] = useState<ISerieByCategoryId[]>([])
  const [selectedAccount] = useSelectedAccount()

  useEffect(() => {
    const fetchAsync = async () => {
      if (!selectedAccount) {
        return
      }

      const data: ISerieByCategoryId[] = await fetch(
        buildApiUrl(
          selectedAccount,
          ['get_series', 'category_id=%sid%s'],
          catId
        ),
        fetchConfig
      ).then((res) => res.json())
      setSeriesByCatId(data)
    }
    fetchAsync()
  }, [catId])

  return seriesByCatId
}
