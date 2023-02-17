import { FlatList, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { SpacerX, SpacerY } from '../spacer'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { MovieCard } from './MovieCard'
import { ICategory } from '../../atoms/api/types'
import { useMoviesByCategoryId } from '../../atoms/api/moviesByCategoryId'
import { IMovie } from '../../atoms/api/moviesTypes'

interface IContentByCategory {
  category: ICategory
}
const ItemSeparatorComponent = () => <SpacerX size={8} />
export const MoviesByCategory: React.FC<IContentByCategory> = ({
  category,
}) => {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
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
        // estimatedItemSize={200}
        horizontal
        showsHorizontalScrollIndicator={false}
        data={streamsByCatId}
        renderItem={_renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}
