import { atom, useAtom, useAtomValue } from 'jotai'
import { uuid } from '../utils/uuid'
import { TFunColors } from '../utils/colors'

export interface IProfile {
  id: string
  name: string
  color: TFunColors
}

const defaultProfiles: IProfile[] = [
  {
    id: uuid(),
    name: 'Florian',
    color: 'red',
  },
  {
    id: uuid(),
    name: 'Orianne',
    color: 'pink2',
  },
  {
    id: 'kids',
    name: 'Kids',
    color: 'green',
  },
]

const profilesAtom = atom<IProfile[]>(defaultProfiles)
const selectedProfileAtom = atom<IProfile | null>(null)

export const useProfiles = () => useAtom(profilesAtom)

export const useSelectedProfile = () => {
  return useAtom(selectedProfileAtom)
}
export const useSelectedProfileValue = () => {
  return useAtomValue<IProfile | null>(selectedProfileAtom)
}
