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
  movieTitle: string
}
export const ContentByCategory: React.FC<IContentByCategory> = ({
  title,
  movieTitle,
}) => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()

  const onPressItem = () => {
    setSelectedMedia(true)
  }

  return (
    <View style={{ paddingLeft: 14, width }}>
      <Text size={30}>{title}</Text>

      <SpacerY size={8} />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {Array.from(Array(10).keys()).map((_, i) => (
          <React.Fragment key={i}>
            <MediaCard title="Dune" year="2022" />
            <SpacerX size={20} />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  )
}
