import React, { useState } from 'react'
import { SpacerX, SpacerY } from '../../spacer'
import { StyleSheet, View } from 'react-native'
import { colors } from '../../../utils/colors'
import { useTranslation } from 'react-i18next'
import { MovieCard } from '../movies/MovieCard'
import Fuse from 'fuse.js'
import FocusPressable from '../../focus-pressable/FocusPressable'
import Text from '../../text'
import { FlashList } from '@shopify/flash-list'
import { IMovie } from '../../../atoms/api/moviesTypes'
import { Search } from '../../../icons/Search'
import { FocusInput } from '../../focus-pressable/FocusInput'
import FuseResult = Fuse.FuseResult

const DATA = [
  {
    added: '1665831900',
    category_id: '11',
    container_extension: 'mkv',
    custom_sid: null,
    direct_source: '',
    name: 'FR| Blade I',
    num: 7188,
    rating: '6.742',
    rating5_based: 0,
    stream_icon:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/pFCZwMEkPaWpjBfZ5tiZWxHTo8I.jpg',
    stream_id: 448937,
    stream_type: 'movie',
    tmdb_id: '36647',
  },
  {
    added: '1665832620',
    category_id: '11',
    container_extension: 'mkv',
    custom_sid: null,
    direct_source: '',
    name: 'FR| Le Retour De La Momie 2001',
    num: 7149,
    rating: '6.3',
    rating5_based: 0,
    stream_icon:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/lpoNz4jcuRGki78ucF0et4Uy3vB.jpg',
    stream_id: 448976,
    stream_type: 'movie',
    tmdb_id: '1734',
  },
  {
    added: '1665831900',
    category_id: '11',
    container_extension: 'mkv',
    custom_sid: null,
    direct_source: '',
    name: 'EN | Blade II',
    num: 7187,
    rating: '6.5',
    rating5_based: 0,
    stream_icon:
      'https://image.tmdb.org/t/p/w600_and_h900_bestv2/yDHwo3eWcMiy5LnnEnlGV9iLu9k.jpg',
    stream_id: 448938,
    stream_type: 'movie',
    tmdb_id: '36586',
  },
]

const options = {
  includeScore: true,
  keys: ['name'],
}

const ItemSeparatorComponent = () => <SpacerY size={10} />

type TSelectTypes = 'movies' | 'series' | 'mylist'
export const SearchScreen = () => {
  const { t } = useTranslation()
  const [selectedTypes, setSelectedTypes] = useState<TSelectTypes[]>([])
  const [results, setResults] = useState<IMovie[]>(DATA)
  const [searchText, setSearchText] = useState('')

  const fuse = new Fuse(DATA, options)

  const onChangeSearchText = (txt: string) => {
    setSearchText(txt)
    if (txt.length === 0) {
      setResults(DATA)
    } else {
      const fuseResults: FuseResult<IMovie>[] = fuse.search(txt)
      setResults(fuseResults.map((r) => r.item))
    }
  }

  const _renderItem = ({ item }) => <MovieCard movie={item} />

  const onSelectFilters = (value: TSelectTypes) => () => {
    if (selectedTypes.includes(value)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== value))
    } else {
      setSelectedTypes([...selectedTypes, value])
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerSearchInput}>
        <Search size={14} />
        <SpacerX size={16} />
        <FocusInput
          style={styles.input}
          focusStyle={styles.inputFocus}
          placeholder={t('search.inputTitle') || ''}
          onChangeText={onChangeSearchText}
          value={searchText}
          autoFocus
          blurOnSubmit={false}
        />

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

        <FocusPressable
          style={[
            styles.searchType,
            selectedTypes.includes('mylist') ? styles.searchTypeSelected : {},
          ]}
          focusStyle={styles.focusType}
          onPress={onSelectFilters('mylist')}
        >
          <Text size={12}>{t('common.mylist')}</Text>
        </FocusPressable>
      </View>

      <SpacerY size={14} />

      <FlashList
        estimatedItemSize={20}
        numColumns={6}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={results}
        renderItem={_renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
      />
    </View>
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
