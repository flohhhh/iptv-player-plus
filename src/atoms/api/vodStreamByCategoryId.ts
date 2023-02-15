import { useSelectedAccount } from '../accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { IStream } from './types'
import { useEffect, useState } from 'react'

export const useStreamsByCategoryId = (catId: string) => {
  const [streamsByCatId, setStreamsByCatId] = useState<IStream[]>([])
  const [selectedAccount] = useSelectedAccount()

  useEffect(() => {
    const fetchAsync = async () => {
      if (!selectedAccount) {
        return
      }

      const data: IStream[] = await fetch(
        buildApiUrl(
          selectedAccount,
          ['get_vod_streams', 'category_id=%sid%s'],
          catId
        ),
        fetchConfig
      ).then((res) => res.json())
      setStreamsByCatId(data)
    }
    fetchAsync()
  }, [catId])

  return streamsByCatId
}
