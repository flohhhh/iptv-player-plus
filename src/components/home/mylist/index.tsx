import { View } from 'react-native'
import React from 'react'
import { useStreamsToList } from '../../../atoms/streams/streamsAtoms'
import { IMovie } from '../../../atoms/api/moviesTypes'
import { MovieCard } from '../movies/MovieCard'
import { useTranslation } from 'react-i18next'
import Text from '../../text'
import { SerieCard } from '../series/SerieCard'
import { ISerieByCategoryId } from '../../../atoms/api/seriesTypes'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'
import { SpacerY } from '../../spacer'
import { FlashList } from '@shopify/flash-list'

export const MyList = () => {
  const { t } = useTranslation()
  const { streamsToList } = useStreamsToList()
  const { account } = useSelectedAccount()

  const _renderMovieItem = ({ item }: { item: IMovie; index: number }) => (
    <MovieCard movie={item} />
  )

  const _renderSerieItem = ({
    item,
  }: {
    item: ISerieByCategoryId
    index: number
  }) => <SerieCard serie={item} />

  if (!account) {
    return null
  }

  const moviesTitle = `${t('common.movies')} (${
    streamsToList[account.id]['movies'].length
  })`
  const seriesTitle = `${t('common.series')} (${
    streamsToList[account.id]['series'].length
  })`
  return (
    <View>
      <SpacerY size={16} />
      <Text size={14}>{moviesTitle}</Text>
      {streamsToList[account.id]['movies'].length > 0 && (
        <FlashList
          keyExtractor={(item) => String(item.stream_id)}
          estimatedItemSize={20}
          horizontal
          // disableHorizontalListHeightMeasurement={true}
          // estimatedListSize={{
          //   width: width,
          //   height: 200,
          // }}
          showsHorizontalScrollIndicator={false}
          data={streamsToList[account.id]['movies']}
          renderItem={_renderMovieItem}
        />
      )}
      <Text size={14}>{seriesTitle}</Text>
      {streamsToList[account.id]['series'].length > 0 && (
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
          data={streamsToList[account.id]['series']}
          renderItem={_renderSerieItem}
        />
      )}
    </View>
  )
}
