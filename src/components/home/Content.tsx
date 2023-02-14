import {
  FlatList,
  ScrollView,
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
    <ScrollView
      style={{
        width: 100,
        height,
      }}
    >
      <ContentByCategory title="My List" />
      <SpacerY size={10} />

      <ContentByCategory title="Action" />
      <SpacerY size={10} />

      <ContentByCategory title="Horror" />
      <SpacerY size={10} />

      <ContentByCategory title="Comedy" />
      <SpacerY size={10} />

      <ContentByCategory title="Thriller" />
      <SpacerY size={10} />

      <ContentByCategory title="Live " />
      <SpacerY size={10} />
    </ScrollView>
  )
}
