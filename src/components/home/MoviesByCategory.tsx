import { Dimensions, FlatList, useWindowDimensions, View } from 'react-native'
import React from 'react'
import Text from '../text'
import { SpacerX, SpacerY } from '../spacer'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { MovieCard } from './MovieCard'
import { ICategory } from '../../atoms/api/types'
import { useMoviesByCategoryId } from '../../atoms/api/moviesByCategoryId'
import { IMovie } from '../../atoms/api/moviesTypes'
import { FlashList } from '@shopify/flash-list'
import { DEFAULT_VALUES } from './constants'

interface IContentByCategory {
  category: ICategory
}
const ItemSeparatorComponent = () => <SpacerX size={8} />
export const MoviesByCategory: React.FC<IContentByCategory> = ({
  category,
}) => {
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()
  const streamsByCatId: IMovie[] = useMoviesByCategoryId(category.category_id)

  const onPressItem = () => {
    setSelectedMedia(1)
  }

  const _renderItem = ({ item }: { item: IMovie }) => <MovieCard movie={item} />

  return (
    <View style={{ paddingLeft: 14 }}>
      <Text size={14}>{category.category_name}</Text>

      <SpacerY size={8} />

      <FlatList
        horizontal
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
