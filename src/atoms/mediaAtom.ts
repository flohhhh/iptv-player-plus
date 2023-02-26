import { atom, useAtom } from 'jotai'

export interface IMedia {
  url: string
}

const mediaAtom = atom<IMedia | null>(null)

export const useSelectedMedia = () => {
  const [media, setMedia] = useAtom(mediaAtom)
  return {
    media,
    setMedia,
  }
}
