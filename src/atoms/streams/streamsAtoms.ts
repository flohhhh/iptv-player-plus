import { atom, useAtom } from 'jotai'
import { IMovie } from '../api/moviesTypes'
import { atomWithMMKV } from '../storageAtoms'
import { IStream } from './types'

const loadingStream = atom<boolean>(false)
const allStreamsAtom = atom<IMovie[]>([])

const streamsToContinueAtom = atomWithMMKV<IStream[]>('streams.to_continue', [])
const streamsAddedToListAtom = atomWithMMKV<IStream[]>(
  'streams.added_to_list',
  []
)

const streamAtom = atom<IStream | null>(null)

export const useSelectedStream = () => {
  const [stream, setStream] = useAtom(streamAtom)
  return {
    stream,
    setStream,
  }
}

export const useLoadingStreams = () => {
  const [loading, setLoading] = useAtom(loadingStream)
  return { loading, setLoading }
}
export const useAllStreams = () => {
  const [streams, setStreams] = useAtom(allStreamsAtom)
  return { streams, setStreams }
}

export const useStreamsToContinue = () => {
  const [streamsToContinue, setStreamsToContinue] = useAtom(
    streamsToContinueAtom
  )
  return { streamsToContinue, setStreamsToContinue }
}

export const useStreamsToList = () => {
  const [streamsToList, setStreamsToList] = useAtom(streamsAddedToListAtom)
  return { streamsToList, setStreamsToList }
}
