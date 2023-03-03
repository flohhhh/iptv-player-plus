import { FlatList, StyleSheet, View } from 'react-native'
import React from 'react'
import Text from '../../text'
import { SpacerX } from '../../spacer'
import { SerieCard } from './SerieCard'
import { ICategory } from '../../../atoms/api/types'
import { ISerieByCategoryId } from '../../../atoms/api/seriesTypes'
import { useSeriesByCategoryId } from '../../../atoms/api/seriesByCategoryId'
import { FlashList } from '@shopify/flash-list'

interface IContentByCategory {
  category: ICategory
}
const ItemSeparatorComponent = () => <SpacerX size={8} />
export const SeriesByCategory: React.FC<IContentByCategory> = ({
  category,
}) => {
  const streamsByCatId: ISerieByCategoryId[] = useSeriesByCategoryId(
    category.category_id
  )
  const _renderItem = ({ item }: { item: ISerieByCategoryId }) => (
    <SerieCard serie={item} />
  )

  // console.log('----streamsByCatId len', streamsByCatId.length)

  return (
    <View style={styles.container}>
      <Text size={14}>{category.category_name}</Text>

      <FlashList
        keyExtractor={(item) => String(item.series_id)}
        estimatedItemSize={20}
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

const styles = StyleSheet.create({
  container: { paddingLeft: 14 },
})
