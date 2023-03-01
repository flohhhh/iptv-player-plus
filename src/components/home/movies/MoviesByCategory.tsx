import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../text'
import { SpacerX } from '../../spacer'
import { MovieCard } from './MovieCard'
import { ICategory } from '../../../atoms/api/types'
import { useMoviesByCategoryId } from '../../../atoms/api/moviesByCategoryId'
import { IMovie } from '../../../atoms/api/moviesTypes'
import { FocusPressableWithFocus } from '../../focus-pressable/FocusPressable'

interface IContentByCategory {
  category: ICategory
}
const ItemSeparatorComponent = () => <SpacerX size={8} />
export const MoviesByCategory: React.FC<IContentByCategory> = ({
  category,
}) => {
  const streamsByCatId: IMovie[] = useMoviesByCategoryId(category.category_id)
  const _renderItem = ({ item }: { item: IMovie }) => <MovieCard movie={item} />

  // console.log('----streamsByCatId len', streamsByCatId.length)

  return (
    <View style={styles.container}>
      <Text size={14}>{category.category_name}</Text>

      <FlatList
        horizontal
        keyExtractor={(item) => String(item.stream_id)}
        // disableHorizontalListHeightMeasurement={true}
        // estimatedListSize={{
        //   width: width,
        //   height: 200,
        // }}
        // estimatedItemSize={200}
        showsHorizontalScrollIndicator={false}
        data={streamsByCatId}
        renderItem={_renderItem}

        // ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingLeft: 14 },
})
