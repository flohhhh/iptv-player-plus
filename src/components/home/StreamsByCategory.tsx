import { FlatList, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { SpacerX, SpacerY } from '../spacer'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { MediaCard } from './MediaCard'
import { IStream, IVodCategory } from '../../atoms/api/types'
// import { FlashList } from '@shopify/flash-list'
import { useStreamsByCategoryId } from '../../atoms/api/vodStreamByCategoryId'
import { FlashList } from '@shopify/flash-list'

interface IContentByCategory {
  category: IVodCategory
}
const ItemSeparatorComponent = () => <SpacerX size={8} />
export const StreamsByCategory: React.FC<IContentByCategory> = ({
  category,
}) => {
  const { t } = useTranslation()
  const { width } = useWindowDimensions()
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()

  const streamsByCatId: IStream[] = useStreamsByCategoryId(category.category_id)

  const onPressItem = () => {
    setSelectedMedia(true)
  }

  const _renderItem = ({ item: stream }: { item: IStream }) => (
    <MediaCard stream={stream} />
  )

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
