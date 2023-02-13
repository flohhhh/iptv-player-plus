import { atom, useAtom, useAtomValue } from 'jotai'
import { uuid } from '../utils/uuid'
import { colors } from '../utils/colors'

export interface IProfile {
  id: string
  name: string
  color: string
}

const defaultProfiles = [
  {
    id: uuid(),
    name: 'Florian',
    color: colors.fun.red,
  },
  {
    id: uuid(),
    name: 'Orianne',
    color: colors.fun.pink2,
  },
  {
    id: 'kids',
    name: 'Kids',
    color: colors.fun.green,
  },
]

const profilesAtom = atom<IProfile[]>(defaultProfiles)
const selectedProfileAtom = atom<IProfile | null>(null)

export const useProfiles = () => useAtom(profilesAtom)

export const useSelectedProfile = () => {
  return useAtom(selectedProfileAtom)
}
