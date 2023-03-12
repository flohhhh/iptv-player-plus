import React from 'react'
import { SpacerY } from '../spacer'
import { ListRenderItem } from '@shopify/flash-list'
import { useSelectDrawerItem } from '../../atoms/drawerAtom'
import { ICategory } from '../../atoms/api/types'
import { StyleSheet } from 'react-native'
import { SearchScreen } from './search'
import { MoviesStreams } from './MoviesStreams'
import { SeriesStreams } from './SeriesStreams'
import { MyList } from './mylist'

const ItemSeparatorComponent = () => <SpacerY size={10} />

interface IScreen {
  renderItem: ListRenderItem<ICategory> | null | undefined
}
export const Streams = () => {
  const { selectDrawerItem } = useSelectDrawerItem()

  if (selectDrawerItem?.current === 'search') {
    return <SearchScreen />
  }

  if (selectDrawerItem?.current === 'series') {
    return <SeriesStreams />
  }

  if (selectDrawerItem.current === 'movies') {
    return <MoviesStreams />
  }

  return <MyList />
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
