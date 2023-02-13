import { atom, useAtom, useAtomValue } from 'jotai'
import { uuid } from '../utils/uuid'
import { colors } from '../utils/colors'

export interface IMedia {
  id: string
  name: string
  color: string
}

const mediaAtom = atom()

export const useSelectedMedia = () => useAtom(mediaAtom)
