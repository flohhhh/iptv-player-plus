import { useSelectedAccount } from '../accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { useEffect, useState } from 'react'
import { ILiveStreamByCategoryId } from './liveStreamsTypes'

export const useLiveStreamsByCategoryId = (catId: string) => {
  const [liveStreamsByCatId, setStreamsByCatId] = useState<
    ILiveStreamByCategoryId[]
  >([])
  const [selectedAccount] = useSelectedAccount()

  useEffect(() => {
    const fetchAsync = async () => {
      if (!selectedAccount) {
        return
      }

      const data: ILiveStreamByCategoryId[] = await fetch(
        buildApiUrl(
          selectedAccount,
          ['get_live_streams', 'category_id=%sid%s'],
          catId
        ),
        fetchConfig
      ).then((res) => res.json())
      setStreamsByCatId(data)
    }
    fetchAsync()
  }, [catId])

  return liveStreamsByCatId
}
