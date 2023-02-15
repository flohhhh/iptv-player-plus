import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import Text from '../text'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { BlurView } from '@react-native-community/blur'
import { isAndroid } from '../../utils/device'
import { IStream } from '../../atoms/api/types'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { colors } from '../../utils/colors'

interface IMediaCard {
  stream: IStream
}
export const MediaCard: React.FC<IMediaCard> = ({ stream }) => {
  const [_, setSelectedMedia] = useSelectedMedia()

  const { onFocus, onBlur, focus } = useFocusBlur()

  const onPressItem = () => {
    setSelectedMedia(stream.stream_id)
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
        style={[
          styles.container,
          {
            borderColor: focus ? colors.white[0] : undefined,
            borderWidth: focus ? 2 : 0,
          },
        ]}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <BlurView
          // @ts-ignore
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
    width: 120,
    height: 180,
  },
  imageStyle: {
    borderRadius: 8,
  },
  absolute: {
    position: 'absolute',
    top: 160,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
