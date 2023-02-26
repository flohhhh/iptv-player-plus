import { useSelectedAccount } from '../accounts/accountsAtom'
import { buildApiUrl, fetchConfig } from './utils'
import { useEffect, useState } from 'react'
import { ILiveStreamByCategoryId } from './liveStreamsTypes'

export const useLiveStreamsByCategoryId = (catId: string) => {
  const [liveStreamsByCatId, setStreamsByCatId] = useState<
    ILiveStreamByCategoryId[]
  >([])
  const { account } = useSelectedAccount()

  useEffect(() => {
    const fetchAsync = async () => {
      if (!account) {
        return
      }

      const data: ILiveStreamByCategoryId[] = await fetch(
        buildApiUrl(account, ['get_live_streams', 'category_id=%sid%s'], catId),
        fetchConfig
      ).then((res) => res.json())
      setStreamsByCatId(data)
    }
    fetchAsync()
  }, [catId])

  return liveStreamsByCatId
}
