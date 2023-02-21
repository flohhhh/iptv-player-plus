import React from 'react'
import { MoviesByCategory } from './movies/MoviesByCategory'
import { SpacerY } from '../spacer'
import { useMoviesVodCategories } from '../../atoms/api/moviesCategories'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useSelectDrawerItem } from '../../atoms/selectDrawerItemAtom'
import { TDrawerItemType } from './DrawerItem'
import { ICategory } from '../../atoms/api/types'
import { MovieDetails } from './movies/MovieDetails'
import { StyleSheet, View } from 'react-native'

const ItemSeparatorComponent = () => <SpacerY size={10} />

interface IScreen {
  renderItem: ListRenderItem<ICategory> | null | undefined
}
const screens: Record<TDrawerItemType, IScreen> = {
  movie: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
  tvshow: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
  canal: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
  mylist: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
}
export const Streams = () => {
  const [selectDrawerItem] = useSelectDrawerItem()

  const { data: vodCategories, isLoading } = useMoviesVodCategories()

  if (isLoading) {
    return null
  }

  // TODO Remove default 'movie' ?
  const _renderItem = screens[selectDrawerItem || 'movie'].renderItem

  return (
    <View style={styles.container}>
      <MovieDetails />
      <FlashList
        estimatedItemSize={80}
        data={vodCategories}
        renderItem={_renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
