import { atom, useAtom, useAtomValue } from 'jotai'
import { uuid } from '../utils/uuid'
import { colors } from '../utils/colors'

export interface IAccount {
  id: string
  username: string
  password: string
}

const accountsAtom = atom<IAccount[]>([])
const selectedAccountAtom = atom<IAccount | null>(null)

export const useAccounts = () => useAtom(accountsAtom)
export const useSelectedAccount = () => useAtom(selectedAccountAtom)
