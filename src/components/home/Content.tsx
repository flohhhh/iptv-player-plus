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
import { ContentByCategory } from './ContentByCategory'
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
      <ContentByCategory title="Category 1" />

      <SpacerY size={20} />

      <ContentByCategory title="Category 12" />

      <SpacerY size={20} />

      <ContentByCategory title="Category 3" />

      <SpacerY size={20} />
    </View>
  )
}
