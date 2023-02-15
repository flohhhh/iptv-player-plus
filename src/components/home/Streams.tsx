import React from 'react'
import { StreamsByCategory } from './StreamsByCategory'
import { SpacerY } from '../spacer'
import { useVodCategories } from '../../atoms/api/vodCategories'
import { FlashList } from '@shopify/flash-list'
import { useWindowDimensions, View } from 'react-native'

const ItemSeparatorComponent = () => <SpacerY size={10} />
export const Streams = () => {
  const { width } = useWindowDimensions()
  const { data: vodCategories, isLoading } = useVodCategories()

  if (isLoading) {
    return null
  }

  return (
    <FlashList
      estimatedItemSize={80}
      data={vodCategories}
      renderItem={({ item: category }) => (
        <StreamsByCategory category={category} />
      )}
      ItemSeparatorComponent={ItemSeparatorComponent}
    />
  )
}
