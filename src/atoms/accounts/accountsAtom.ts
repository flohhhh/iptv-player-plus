import { useAtom } from 'jotai'
import { IAccount } from './types'
import { atomWithMMKV } from '../storageAtoms'
import { useStreamsToContinue, useStreamsToList } from '../streams/streamsAtoms'

// const defaultAccount = {
// id: 1,
// host: 'http://mol-2.com:8080',
// username: 'sc68Kfd0em3tNKK',
// password: 'asm7VUX0zA0y7Y8',
// }

export const selectedAccountAtom = atomWithMMKV<IAccount | null>(
  'account.selected',
  null
)

export const useSelectedAccount = () => {
  const [account, setAccountFunc] = useAtom(selectedAccountAtom)

  const { setStreamsToContinue } = useStreamsToContinue()
  const { setStreamsToList } = useStreamsToList()

  const setAccount = (acc: IAccount) => {
    setAccountFunc(acc)
    setStreamsToContinue((prev) => ({
      [acc.id]: { movies: [], series: [] },
      ...prev,
    }))
    setStreamsToList((prev) => ({
      [acc.id]: { movies: [], series: [] },
      ...prev,
    }))
  }
  return { account, setAccount }
}
