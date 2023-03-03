import { useSelectedAccount } from '../accounts/accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { useEffect, useState } from 'react'
import { ISerie } from './seriesTypes'

export const useSeriesByCategoryId = (catId: string) => {
  const [seriesByCatId, setSeriesByCatId] = useState<ISerie[]>([])
  const { account } = useSelectedAccount()

  useEffect(() => {
    const fetchAsync = async () => {
      if (!account) {
        return
      }

      const data: ISerie[] = await fetch(
        buildApiUrl(account, ['get_series', 'category_id=%sid%s'], catId),
        fetchConfig
      ).then((res) => res.json())
      setSeriesByCatId(data)
    }
    fetchAsync()
  }, [catId])

  return seriesByCatId
}
