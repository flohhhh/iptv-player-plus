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
import { useSelectedAccount } from '../../atoms/accounts/accountsAtom'
import { IStreamMovie } from '../../atoms/streams/types'
import { isMovieStream } from '../../atoms/streams/utils'
import Text from '../text'
import { useTranslation } from 'react-i18next'
import { colors } from '../../utils/colors'

const ItemSeparatorComponent = () => <SpacerY size={10} />

export const MoviesStreams = () => {
  const { t } = useTranslation()
  const { data: moviesCategories, isLoading } = useMoviesVodCategories()

  const { account } = useSelectedAccount()
  const { streamsToContinue } = useStreamsToContinue()

  if (isLoading || !account) {
    return null
  }

  const renderItem = ({ item, index }: { item: ICategory; index: number }) => (
    <MoviesByCategory category={item} index={index} />
  )

  const _renderToContinueItem = ({ item }: { item: IMovie }) => (
    <MovieCard movie={item} />
  )

  const data: IMovie[] = streamsToContinue
    ? streamsToContinue[account.id]
        .filter((s) => isMovieStream(s))
        .map((s) => s.info as IMovie)
    : []

  return (
    <View style={styles.container}>
      <MovieDetails />

      {data.length > 0 && (
        <>
          <Text size={14} color={colors.white[0]}>
            {t('streams.continue_watching')}
          </Text>
          <SpacerY size={1} />
          <FlashList
            horizontal
            estimatedItemSize={10}
            data={data}
            renderItem={_renderToContinueItem}
            ItemSeparatorComponent={ItemSeparatorComponent}
          />
        </>
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
