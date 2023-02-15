import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import React from 'react'
import { useSelectedProfile } from '../../atoms/profilesAtom'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { BlurView } from '@react-native-community/blur'
import { isAndroid } from '../../utils/device'
import { IStream } from '../../atoms/api/types'

interface IMediaCard {
  stream: IStream
}
export const MediaCard: React.FC<IMediaCard> = ({ stream }) => {
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
        uri: stream.stream_icon,
      }}
      resizeMode="contain"
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
          blurType="extraDark"
          blurAmount={2}
        />
        <View style={styles.title}>
          <Text size={10} numberOfLines={1}>
            {stream.name.split('|')[1]}
          </Text>
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
