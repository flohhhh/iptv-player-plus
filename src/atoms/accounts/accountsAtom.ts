import { atom, useAtom } from 'jotai'
import { IAccount } from './types'
import { atomWithMMKV } from '../storageAtoms'

const defaultAccount = {
  // id: 1,
  // host: 'http://mol-2.com:8080',
  // username: 'sc68Kfd0em3tNKK',
  // password: 'asm7VUX0zA0y7Y8',
}

const selectedAccountAtom = atomWithMMKV<IAccount | null>(
  'account.selected',
  null
)

export const useSelectedAccount = () => useAtom(selectedAccountAtom)
