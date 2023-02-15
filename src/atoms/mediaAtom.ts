import { atom, useAtom } from 'jotai'

// export interface IMedia {
//   id: number
// }

const mediaAtom = atom<number | null>(null)

export const useSelectedMedia = () => useAtom(mediaAtom)
