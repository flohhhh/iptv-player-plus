import React from 'react'
import { MoviesByCategory } from './movies/MoviesByCategory'
import { SpacerY } from '../spacer'
import { useMoviesVodCategories } from '../../atoms/api/moviesCategories'
import { FlashList } from '@shopify/flash-list'
import { ICategory } from '../../atoms/api/types'
import { MovieDetails } from './movies/MovieDetails'
import { StyleSheet, View } from 'react-native'
import { useStreamsToContinue } from '../../atoms/streams/streamsAtoms'
import { IMovie } from '../../atoms/api/moviesTypes'
import { MovieCard } from './movies/MovieCard'

const ItemSeparatorComponent = () => <SpacerY size={10} />

export const MoviesStreams = () => {
  const { data: moviesCategories, isLoading } = useMoviesVodCategories()

  const { streamsToContinue } = useStreamsToContinue()

  if (isLoading) {
    return null
  }

  const renderItem = ({ item, index }: { item: ICategory; index: number }) => (
    <MoviesByCategory category={item} index={index} />
  )

  const _renderToContinueItem = ({ item }: { item: IMovie }) => (
    <MovieCard movie={item} />
  )

  const data = streamsToContinue ? streamsToContinue['movies'] : []

  return (
    <View style={styles.container}>
      <MovieDetails />

      {data.length > 0 && (
        <FlashList
          estimatedItemSize={10}
          data={data}
          renderItem={_renderToContinueItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      )}

      <FlashList
        keyExtractor={(item) => String(item.category_id)}
        estimatedItemSize={80}
        data={moviesCategories}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
