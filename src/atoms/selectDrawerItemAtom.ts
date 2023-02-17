import { atom, useAtom } from 'jotai'
import { TDrawerItemType } from '../components/home/DrawerItem'

const selectDrawerItemAtom = atom<TDrawerItemType | null>(null)

export const useSelectDrawerItem = () => useAtom(selectDrawerItemAtom)
