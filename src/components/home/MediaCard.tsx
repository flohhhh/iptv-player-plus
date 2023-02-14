import {
  FlatList,
  ScrollView,
  StyleSheet,
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
import { colors } from '../../utils/colors'

interface IMediaCard {
  title: string
  year: string
}
export const MediaCard: React.FC<IMediaCard> = ({ title, year }) => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()

  const onPressItem = () => {
    setSelectedMedia(true)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPressItem}
      style={styles.container}
    >
      <View style={styles.title}>
        <View style={{ flexDirection: 'row' }}>
          <Text size={10}>{title}</Text>
          <SpacerX size={4} />
          <Text size={6} color={colors.white['0']} opacity={0.8}>
            {year}
          </Text>
        </View>
        <View>
          <Text size={8}>01 : 45 : 00</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 80,
    borderRadius: 8,
    backgroundColor: 'red',
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  title: {
    flex: 1,
    flexDirection: 'row',

    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
})
