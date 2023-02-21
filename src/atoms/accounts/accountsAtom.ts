import { atom, useAtom } from 'jotai'
import { IAccount } from './types'

const defaultAccount = {
  id: 1,
  host: 'http://mol-2.com:8080',
  username: 'sc68Kfd0em3tNKK',
  password: 'asm7VUX0zA0y7Y8',
}

const accountsAtom = atom<IAccount[]>([])
export const selectedAccountAtom = atom<IAccount | null>(defaultAccount)

export const useAccounts = () => useAtom(accountsAtom)
export const useSelectedAccount = () => useAtom(selectedAccountAtom)
