import { ImageBackground, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Text from '../../text'
import { useSelectedStream } from '../../../atoms/streams/streamsAtoms'
import { isAndroid } from '../../../utils/device'
import { IMovie } from '../../../atoms/api/moviesTypes'
import { useFocusBlur } from '../../../hooks/useFocusBlur'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { DEFAULT_VALUES } from '../constants'
import { useDrawerOpen } from '../../../atoms/selectDrawerItemAtom'
import { useFocusMovieId } from '../../../atoms/api/moviesCategories'
import { buildStreamUrl } from '../../../atoms/api/utils'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'

interface IMovieCard {
  movie: IMovie
}
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

export const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const { account } = useSelectedAccount()
  const { setStream } = useSelectedStream()
  const { setDrawerOpen } = useDrawerOpen()

  const { onFocus, onBlur, focus } = useFocusBlur()
  const [_3, setFocusId] = useFocusMovieId()

  const onFocusChange = () => {
    onFocus()
    setFocusId(movie.stream_id)
    setDrawerOpen(false)
  }

  const { WIDTH, HEIGHT } = DEFAULT_VALUES

  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focus ? 1 : 0.9) }],
  }))

  const onPressItem = () => {
    const url = buildStreamUrl('movie', account, movie.stream_id)

    setStream({ id: movie.stream_id, type: 'movie', url })
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
