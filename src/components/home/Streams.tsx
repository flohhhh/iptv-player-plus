import React from 'react'
import { MoviesByCategory } from './movies/MoviesByCategory'
import { SpacerY } from '../spacer'
import { useMoviesVodCategories } from '../../atoms/api/moviesCategories'
import { FlashList, ListRenderItem } from '@shopify/flash-list'
import { useSelectDrawerItem } from '../../atoms/drawerAtom'
import { TDrawerItemType } from './drawer/DrawerItem'
import { ICategory } from '../../atoms/api/types'
import { MovieDetails } from './movies/MovieDetails'
import { StyleSheet, View } from 'react-native'
import { SearchScreen } from './search'

const ItemSeparatorComponent = () => <SpacerY size={10} />

interface IScreen {
  renderItem: ListRenderItem<ICategory> | null | undefined
}
const screens: Record<TDrawerItemType, IScreen> = {
  search: { renderItem: () => <View /> },
  movies: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
  series: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
  live: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
  mylist: {
    renderItem: ({ item }) => <MoviesByCategory category={item} />,
  },
}
export const Streams = () => {
  const { selectDrawerItem } = useSelectDrawerItem()

  const { data: vodCategories, isLoading } = useMoviesVodCategories()

  if (isLoading) {
    return null
  }

  if (selectDrawerItem === 'search') {
    return <SearchScreen />
  }

  return (
    <View style={styles.container}>
      <MovieDetails />
      <FlashList
        estimatedItemSize={80}
        data={vodCategories}
        renderItem={screens[selectDrawerItem].renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
