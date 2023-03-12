import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { SpacerX, SpacerY } from '../../spacer'
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native'
import { colors } from '../../../utils/colors'
import { useTranslation } from 'react-i18next'
import Fuse from 'fuse.js'
import Text from '../../text'
import { FlashList } from '@shopify/flash-list'
import { Search } from '../../../icons/Search'
import {
  FocusPressable,
  FocusPressableWithFocus,
} from '../../focus-pressable/FocusPressable'
import { useMoviesByCategoryId } from '../../../atoms/api/moviesByCategoryId'
import { ISearchStream, SearchCard } from './SearchCard'
import { useSeriesByCategoryId } from '../../../atoms/api/seriesByCategoryId'
import FuseResult = Fuse.FuseResult
import { debounce } from '../../../utils/debounce'

const options = {
  includeScore: true,
  keys: ['name'],
}

const ItemSeparatorComponent = () => <SpacerY size={10} />

type TSelectTypes = 'movies' | 'series' // | 'mylist'
export const SearchScreen = () => {
  const { t } = useTranslation()

  const { movies, loading: loadingMovies } = useMoviesByCategoryId('all')
  const { series, loading: loadingSeries } = useSeriesByCategoryId('all')

  const moviesMemo: ISearchStream[] = useMemo(
    () =>
      movies.map((m) => ({
        streamId: m.stream_id,
        coverUri: m.stream_icon,
        type: 'movies',
        ...m,
      })),
    [movies]
  )

  const seriesMemo: ISearchStream[] = useMemo(
    () =>
      series.map((s) => ({
        streamId: s.series_id,
        coverUri: s.cover,
        type: 'series',
        ...s,
      })),
    [series]
  )

  const all = useMemo(
    () => [...moviesMemo, ...seriesMemo],
    [movies, seriesMemo]
  )

  const [selectedTypes, setSelectedTypes] = useState<TSelectTypes[]>([])
  const [results, setResults] = useState<ISearchStream[]>([])
  const [searchText, setSearchText] = useState('')

  const fuse = new Fuse(all, options)

  const search = (txt: string) => {
    const fuseResults: FuseResult<ISearchStream>[] = fuse.search(txt)
    setResults(fuseResults.map((r) => r.item))
  }

  const delayedSearch = useCallback(
    debounce((txt: string) => search(txt)),
    []
  )

  const onChangeSearchText = (txt: string) => {
    setSearchText(txt)
    if (txt.length === 0) {
      setResults(all)
    } else {
      delayedSearch(txt)
    }
  }

  const _renderItem = ({ item }: { item: ISearchStream }) => (
    <SearchCard item={item} />
  )

  const onSelectFilters = (value: TSelectTypes) => () => {
    if (selectedTypes.includes(value)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== value))
    } else {
      setSelectedTypes([...selectedTypes, value])
    }
  }

  useEffect(() => {
    if (searchText.length === 0) {
      setResults(all)
    } else if (selectedTypes.length > 0) {
      setResults((prevResults) =>
        prevResults.filter((i) => selectedTypes.includes(i.type))
      )
    } else {
      search(searchText)
    }
  }, [all, selectedTypes])

  if (loadingMovies || loadingSeries) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="small" color={colors.white['1']} />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSearchInput}>
        <Search size={14} />
        <SpacerX size={16} />
        <FocusPressableWithFocus>
          {(focus) => (
            <SearchInput
              focus={focus}
              onChangeSearchText={onChangeSearchText}
              searchText={searchText}
            />
          )}
        </FocusPressableWithFocus>

        <SpacerX size={12} />

        <Text size={12}>
          {t(`search.result${results.length > 1 ? 's' : ''}`, {
            count: results.length,
          })}
        </Text>
      </View>

      <SpacerY size={10} />

      <View style={styles.containerSearchTypes}>
        <FocusPressable
          style={[
            styles.searchType,
            selectedTypes.includes('movies') ? styles.searchTypeSelected : null,
          ]}
          focusStyle={styles.focusType}
          onPress={onSelectFilters('movies')}
        >
          <Text size={12}>{t('common.movies')}</Text>
        </FocusPressable>

        <SpacerX size={8} />

        <FocusPressable
          style={[
            styles.searchType,
            selectedTypes.includes('series') ? styles.searchTypeSelected : {},
          ]}
          focusStyle={styles.focusType}
          onPress={onSelectFilters('series')}
        >
          <Text size={12}>{t('common.series')}</Text>
        </FocusPressable>

        <SpacerX size={8} />
      </View>

      <SpacerY size={14} />

      <FlashList
        keyExtractor={(item) => `${item.type}-${String(item.streamId)}`}
        estimatedItemSize={500}
        numColumns={7}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={results}
        renderItem={_renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
  )
}

const SearchInput: React.FC<{
  focus: boolean
  onChangeSearchText: (str: string) => void
  searchText: string
}> = ({ focus, onChangeSearchText, searchText }) => {
  const { t } = useTranslation()
  const refSearchInput = useRef<TextInput | null>(null)

  useEffect(() => {
    if (focus) {
      refSearchInput.current?.focus()
    }
  }, [focus])

  return (
    <TextInput
      ref={refSearchInput}
      style={[focus ? { ...styles.input, ...styles.inputFocus } : styles.input]}
      placeholder={t('search.inputTitle') || ''}
      onChangeText={onChangeSearchText}
      value={searchText}
      blurOnSubmit={false}
    />
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  containerSearchInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainerStyle: {
    alignSelf: 'flex-start',
  },
  input: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: colors.gray['3'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    width: 240,
  },
  inputFocus: {
    borderColor: colors.gray['0'],
  },
  containerSearchTypes: {
    flexDirection: 'row',
  },
  searchType: {
    backgroundColor: colors.black['1'],
    borderColor: colors.black['1'],
    borderRadius: 4,
    borderWidth: 1,
    width: 100,
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  focusType: {
    borderColor: colors.gray['0'],
  },
  searchTypeSelected: {
    borderColor: colors.fun.greenSecondary,
    borderWidth: 1,
  },
})
