import { atom, useAtom } from 'jotai'
import { TDrawerItemType } from '../components/home/drawer/DrawerItem'

const drawerAtom = atom<TDrawerItemType>('movies')
const selectDrawerOpenAtom = atom<boolean>(true)

export const useSelectDrawerItem = () => {
  const [selectDrawerItem, setSelectDrawerItem] = useAtom(drawerAtom)
  return { selectDrawerItem, setSelectDrawerItem }
}
export const useDrawerOpen = () => {
  const [drawerOpen, setDrawerOpen] = useAtom(selectDrawerOpenAtom)
  return { drawerOpen, setDrawerOpen }
}
