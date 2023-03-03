import React from 'react'
import { SpacerY } from '../spacer'
import { FlashList } from '@shopify/flash-list'
import { ICategory } from '../../atoms/api/types'
import { StyleSheet, View } from 'react-native'
import { useSeriesCategories } from '../../atoms/api/seriesCategories'
import { SeriesByCategory } from './series/SeriesByCategory'
import { SerieDetails } from './series/SerieDetails'

const ItemSeparatorComponent = () => <SpacerY size={10} />

export const SeriesStreams = () => {
  const { data: seriesCategories, isLoading } = useSeriesCategories()

  if (isLoading) {
    return null
  }

  const renderItem = ({ item }: { item: ICategory }) => (
    <SeriesByCategory category={item} />
  )

  return (
    <View style={styles.container}>
      <SerieDetails />
      <FlashList
        keyExtractor={(item) => String(item.category_id)}
        estimatedItemSize={80}
        data={seriesCategories}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1 },
})
