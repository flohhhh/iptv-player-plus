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
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'

interface IMediaCard {
  stream: IStream
}
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const DEFAULT_VALUES = {
  WIDTH: 120,
  HEIGHT: 180,
}
export const MediaCard: React.FC<IMediaCard> = ({ stream }) => {
  const [_, setSelectedMedia] = useSelectedMedia()

  const { onFocus, onBlur, focus } = useFocusBlur()

  const { WIDTH, HEIGHT } = DEFAULT_VALUES

  const animatedImageStyle = useAnimatedStyle(() => ({
    width: withTiming(focus ? WIDTH + 10 : WIDTH),
    height: withTiming(focus ? HEIGHT + 10 : HEIGHT),
  }))
  const animatedTouchableStyle = useAnimatedStyle(() => ({
    borderColor: withTiming(focus ? colors.white[0] : '#000'),
    borderWidth: withTiming(focus ? 3 : 0),
  }))

  const onPressItem = () => {
    setSelectedMedia(stream.stream_id)
  }

  return (
    <AnimatedImageBackground
      source={{
        uri: stream.stream_icon,
      }}
      resizeMode="contain"
      style={animatedImageStyle}
      imageStyle={styles.imageStyle}
    >
      <AnimatedTouchableOpacity
        activeOpacity={0.9}
        onPress={onPressItem}
        style={[styles.container, animatedTouchableStyle]}
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
      </AnimatedTouchableOpacity>
    </AnimatedImageBackground>
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
