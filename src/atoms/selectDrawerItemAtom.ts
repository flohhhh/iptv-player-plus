import { atom, useAtom } from 'jotai'
import { TDrawerItemType } from '../components/home/drawer/DrawerItem'

const selectDrawerItemAtom = atom<TDrawerItemType | null>(null)
const selectDrawerOpenAtom = atom<boolean>(true)

export const useSelectDrawerItem = () => useAtom(selectDrawerItemAtom)
export const useSelectDrawerOpen = () => useAtom(selectDrawerOpenAtom)
