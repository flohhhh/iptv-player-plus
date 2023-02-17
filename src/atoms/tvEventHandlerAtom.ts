import { atom, useAtom } from 'jotai'

export type TEventType = 'right' | 'up' | 'left' | 'down' | 'playPause'
const tvEventHandlerAtom = atom()

export const useTvEvent = () => useAtom(tvEventHandlerAtom)
