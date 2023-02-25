import { atom, useAtom } from 'jotai'
import { IMovie } from './api/moviesTypes'

const loadingStream = atom<boolean>(false)
const allStreamsAtom = atom<IMovie[]>([])

export const useLoadingStreams = () => {
  const [loading, setLoading] = useAtom(loadingStream)
  return { loading, setLoading }
}
export const useAllStreams = () => {
  const [streams, setStreams] = useAtom(allStreamsAtom)
  return { streams, setStreams }
}
