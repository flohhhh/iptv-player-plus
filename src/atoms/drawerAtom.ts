import { atom, useAtom } from 'jotai'
import { TDrawerItemType } from '../components/home/drawer/types'

const drawerAtom = atom<TDrawerItemType>('movies')
const selectDrawerOpenAtom = atom<boolean>(false)

export const useSelectDrawerItem = () => {
  const [selectDrawerItem, setSelectDrawerItem] = useAtom(drawerAtom)
  return { selectDrawerItem, setSelectDrawerItem }
}
export const useDrawerOpen = () => {
  const [drawerOpen, setDrawerOpen] = useAtom(selectDrawerOpenAtom)
  return { drawerOpen, setDrawerOpen }
}
