import {
  FlatList,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import React from 'react'
import { useSelectedProfile } from '../../atoms/profilesAtom'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { SpacerX, SpacerY } from '../spacer'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { MediaCard } from './MediaCard'

interface IContentByCategory {
  title: string
}
export const ContentByCategory: React.FC<IContentByCategory> = ({ title }) => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()

  const onPressItem = () => {
    setSelectedMedia(true)
  }

  const _renderItem = () => (
    <>
      <MediaCard title="Dune" year="2022" />
      <SpacerX size={8} />
    </>
  )

  return (
    <View style={{ paddingLeft: 14, width }}>
      <Text size={16}> {title}</Text>

      <SpacerY size={8} />

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
        renderItem={_renderItem}
      />
    </View>
  )
}
