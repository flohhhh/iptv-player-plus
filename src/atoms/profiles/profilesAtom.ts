import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { IProfile } from './types'
import { storage } from '../../storage'
import { atomWithMMKV } from '../storageAtoms'

const defaultProfiles: IProfile[] = [
  // {
  //   id: uuid(),
  //   name: 'Florian',
  //   color: 'red',
  // },
  // {
  //   id: uuid(),
  //   name: 'Orianne',
  //   color: 'pink2',
  // },
  // {
  //   id: 'kids',
  //   name: 'Kids',
  //   color: 'green',
  // },
]

const profilesAtom = atomWithMMKV<IProfile[]>('profile.all', [])
const selectedProfileAtom = atom<IProfile | null>(null)

export const useProfiles = () => {
  return useAtom(profilesAtom)
}

export const useSelectedProfile = () => {
  return useAtom(selectedProfileAtom)
}

export const useSelectedProfileSet = () => {
  const setAtom = useSetAtom(selectedProfileAtom)
  const setV = (selectedProfile: IProfile | null) => {
    if (selectedProfile) {
      storage().set('profile.selected.id', selectedProfile.id)
    }
    setAtom(selectedProfile)
  }
  return setV
}
export const useSelectedProfileValue = () => {
  return useAtomValue<IProfile | null>(selectedProfileAtom)
}

export const useLastSelectedProfileID = () => {
  return storage().get('profile.selected.id')
}
