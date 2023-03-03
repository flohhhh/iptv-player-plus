import React from 'react'
import { SpacerY } from '../spacer'
import { FlashList } from '@shopify/flash-list'
import { ICategory } from '../../atoms/api/types'
import { StyleSheet, View } from 'react-native'
import { useSeriesCategories } from '../../atoms/api/seriesCategories'
import { SeriesByCategory } from './series/SeriesByCategory'
import { SerieDetails } from './series/SerieDetails'
import { isSerieStream } from '../../atoms/streams/utils'
import { useStreamsToContinue } from '../../atoms/streams/streamsAtoms'
import { useSelectedAccount } from '../../atoms/accounts/accountsAtom'
import { ISerie } from '../../atoms/api/seriesTypes'
import { SerieCard } from './series/SerieCard'

const ItemSeparatorComponent = () => <SpacerY size={10} />

export const SeriesStreams = () => {
  const { data: seriesCategories, isLoading } = useSeriesCategories()
  const { account } = useSelectedAccount()
  const { streamsToContinue } = useStreamsToContinue()

  if (isLoading || !account) {
    return null
  }

  const renderItem = ({ item }: { item: ICategory }) => (
    <SeriesByCategory category={item} />
  )

  const _renderToContinueItem = ({ item }: { item: ISerie }) => (
    <SerieCard serie={item} />
  )

  const data: ISerie[] = streamsToContinue
    ? streamsToContinue[account.id]
        .filter((s) => isSerieStream(s))
        .map((s) => s.info as ISerie)
    : []

  return (
    <View style={styles.container}>
      {data.length > 0 && (
        <FlashList
          estimatedItemSize={10}
          data={data}
          renderItem={_renderToContinueItem}
          ItemSeparatorComponent={ItemSeparatorComponent}
        />
      )}
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
