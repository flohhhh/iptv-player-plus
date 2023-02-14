import {
  FlatList,
  ImageBackground,
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
import { BlurView } from '@react-native-community/blur'
import { isAndroid } from '../../utils/device'

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
    <ImageBackground
      source={{
        uri: 'https://static1.colliderimages.com/wordpress/wp-content/uploads/2021/10/dune-social-feature.jpg',
      }}
      resizeMode="cover"
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onPressItem}
        style={styles.container}
      >
        <BlurView
          overlayColor="transparent"
          style={styles.absolute}
          blurType="light"
          blurAmount={2}
        />
        <View style={styles.title}>
          <View style={styles.row}>
            <Text size={10}>{title}</Text>
            <SpacerX size={4} />
            <Text size={6} color={colors.white['0']} opacity={0.8}>
              {year}
            </Text>
          </View>
          <Text size={8}>01 : 45 : 00</Text>
        </View>
      </TouchableOpacity>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: isAndroid ? 'hidden' : 'visible',
    flex: 1,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  row: { flexDirection: 'row' },
  title: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  image: {
    // flex: 1,
    width: 120,
    height: 80,
  },
  imageStyle: {
    borderRadius: 8,
  },
  absolute: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
