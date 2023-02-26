import { atom, useAtom } from 'jotai'
import { TDrawerItemType } from '../components/home/drawer/DrawerItem'

const selectDrawerItemAtom = atom<TDrawerItemType | null>(null)
const selectDrawerOpenAtom = atom<boolean>(true)

export const useSelectDrawerItem = () => {
  const [selectDrawerItem, setSelectDrawerItem] = useAtom(selectDrawerItemAtom)
  return { selectDrawerItem, setSelectDrawerItem }
}
export const useDrawerOpen = () => {
  const [drawerOpen, setDrawerOpen] = useAtom(selectDrawerOpenAtom)
  return { drawerOpen, setDrawerOpen }
}
