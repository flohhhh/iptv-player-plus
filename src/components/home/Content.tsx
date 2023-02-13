import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import React from 'react'
import { useSelectedProfile } from '../../atoms/profilesAtom'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { ContentCard } from './ContentCard'
import { SpacerY } from '../spacer'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import Player from '../player'

export const Content = () => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()

  return (
    <View
      style={{
        width: 100,
        height,
      }}
    >
      <ContentCard categoryName="Category 1" />

      <SpacerY size={20} />

      <ContentCard categoryName="Category 12" />

      <SpacerY size={20} />

      <ContentCard categoryName="Category 3" />

      <SpacerY size={20} />
    </View>
  )
}
