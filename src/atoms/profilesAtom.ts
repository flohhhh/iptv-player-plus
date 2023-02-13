import { atom, useAtom, useAtomValue } from 'jotai'
import { uuid } from '../utils/uuid'

export interface IProfile {
  id: string
  name: string
  img?: string
}

const defaultProfiles = [
  {
    id: uuid(),
    name: 'Florian',
  },
  {
    id: uuid(),
    name: 'Orianne',
  },
  {
    id: 'kids',
    name: 'Kids',
  },
]

const profilesAtom = atom<IProfile[]>(defaultProfiles)
const selectedProfileAtom = atom<IProfile | null>(null)

export const useProfiles = () => useAtom(profilesAtom)

export const useSelectedProfile = () => {
  return useAtom(selectedProfileAtom)
}
