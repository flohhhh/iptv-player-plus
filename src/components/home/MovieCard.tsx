import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import Text from '../text'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { isAndroid } from '../../utils/device'
import { IMovie } from '../../atoms/api/moviesTypes'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { colors } from '../../utils/colors'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { DEFAULT_VALUES } from './constants'
import { useSelectDrawerOpen } from '../../atoms/selectDrawerItemAtom'

interface IMovieCard {
  movie: IMovie
}
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const [_1, setDrawerIsOpen] = useSelectDrawerOpen()
  const [_2, setSelectedMedia] = useSelectedMedia()

  const { onFocus, onBlur, focus } = useFocusBlur()

  const onFocusChange = () => {
    onFocus()
    setDrawerIsOpen(false)
  }

  const { WIDTH, HEIGHT } = DEFAULT_VALUES

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focus ? 1 : 0.9) }],
  }))

  const onPressItem = () => {
    setSelectedMedia(movie.stream_id)
  }

  return (
    <AnimatedImageBackground
      source={{
        uri: movie.stream_icon,
      }}
      resizeMode="contain"
      style={[animatedImageStyle]}
      imageStyle={[styles.imageStyle]}
    >
      <AnimatedTouchableOpacity
        activeOpacity={0.9}
        onPress={onPressItem}
        style={[styles.container, { width: WIDTH, height: HEIGHT }]}
        onFocus={onFocusChange}
        onBlur={onBlur}
      >
        <Text size={10} style={styles.title} numberOfLines={1}>
          {movie.name.split('|')[1]}
        </Text>
      </AnimatedTouchableOpacity>
    </AnimatedImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: isAndroid ? 'hidden' : 'visible',
    flex: 1,
    borderRadius: 8,
    justifyContent: 'flex-end',
    width: DEFAULT_VALUES.WIDTH,
    height: DEFAULT_VALUES.HEIGHT,
  },
  title: {
    position: 'absolute',
    paddingTop: 4,
    paddingHorizontal: 2,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
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
