import { atom, useAtom } from 'jotai'
import { TDrawerItemType } from '../components/home/drawer/types'

interface IDrawerItemAtom {
  current: TDrawerItemType | null
  prev: TDrawerItemType | null
}
const drawerAtom = atom<IDrawerItemAtom>({
  prev: null,
  current: 'movies',
})
const selectDrawerOpenAtom = atom<boolean>(false)

export const useSelectDrawerItem = () => {
  const [selectDrawerItem, setSelectDrawerItemRaw] = useAtom(drawerAtom)

  const setSelectDrawerItem = (curr: TDrawerItemType) => {
    setSelectDrawerItemRaw((prevState) => ({
      prev: prevState.current,
      current: curr,
    }))
  }
  return { selectDrawerItem, setSelectDrawerItem }
}
export const useDrawerOpen = () => {
  const [drawerOpen, setDrawerOpen] = useAtom(selectDrawerOpenAtom)
  return { drawerOpen, setDrawerOpen }
}
