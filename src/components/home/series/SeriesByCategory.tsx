import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../text'
import { SpacerX } from '../../spacer'
import { SerieCard } from './SerieCard'
import { ICategory } from '../../../atoms/api/types'
import { ISerie } from '../../../atoms/api/seriesTypes'
import { useSeriesByCategoryId } from '../../../atoms/api/seriesByCategoryId'
import { FlashList } from '@shopify/flash-list'

interface IContentByCategory {
  category: ICategory
}
const ItemSeparatorComponent = () => <SpacerX size={8} />
export const SeriesByCategory: React.FC<IContentByCategory> = ({
  category,
}) => {
  const { series } = useSeriesByCategoryId(category.category_id)
  const _renderItem = ({ item }: { item: ISerie }) => <SerieCard serie={item} />

  return (
    <View style={styles.container}>
      <Text size={14}>{category.category_name}</Text>

      {series.length > 0 && (
        <FlashList
          keyExtractor={(item) => String(item.series_id)}
          estimatedItemSize={20}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={series}
          renderItem={_renderItem}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: { paddingLeft: 14 },
})
