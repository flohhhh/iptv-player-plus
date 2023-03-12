import { StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../text'
import { MovieCard } from './MovieCard'
import { ICategory } from '../../../atoms/api/types'
import { useMoviesByCategoryId } from '../../../atoms/api/moviesByCategoryId'
import { IMovie } from '../../../atoms/api/moviesTypes'
import { FlashList } from '@shopify/flash-list'

interface IContentByCategory {
  index: number
  category: ICategory
}
export const MoviesByCategory: React.FC<IContentByCategory> = ({
  index,
  category,
}) => {
  const { movies } = useMoviesByCategoryId(category.category_id)

  const _renderItem = ({
    item,
    index: index2,
  }: {
    item: IMovie
    index: number
  }) => (
    <MovieCard movie={item} hasTVPreferredFocus={index === 0 && index2 === 0} />
  )

  return (
    <View style={styles.container}>
      <Text size={14}>{category.category_name}</Text>

      {movies.length > 0 && (
        <FlashList
          keyExtractor={(item) => String(item.stream_id)}
          horizontal
          estimatedItemSize={200}
          showsHorizontalScrollIndicator={false}
          data={movies}
          renderItem={_renderItem}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingLeft: 14 },
})
