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
import { SpacerX } from '../spacer'
import { useSelectedMedia } from '../../atoms/mediaAtom'

interface IContentCard {
  categoryName: string
}
export const ContentCard: React.FC<IContentCard> = ({ categoryName }) => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()

  const onPressItem = () => {
    console.log('----aaaaa')
    setSelectedMedia(true)
  }

  return (
    <View style={{ paddingLeft: 14, width }}>
      <Text size={30}>{categoryName}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={onPressItem}
          style={{ width: 100, height: 80, backgroundColor: 'red' }}
        >
          <Text size={12}>Cocuou</Text>
        </TouchableOpacity>
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'red' }} />
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'red' }} />
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'red' }} />
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'red' }} />
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'red' }} />
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'red' }} />
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'red' }} />
        <SpacerX size={20} />

        <View style={{ width: 100, height: 80, backgroundColor: 'yellow' }} />
        <SpacerX size={20} />
      </ScrollView>
    </View>
  )
}
