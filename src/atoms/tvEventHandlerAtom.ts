import { atom, useAtom } from 'jotai'

const tvEventHandlerAtom = atom()

export const useTvEvent = () => useAtom(tvEventHandlerAtom)
