import { ImageBackground, StyleProp, StyleSheet, ViewStyle } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import Text from '../../text'
import { useSelectedStream } from '../../../atoms/streams/streamsAtoms'
import { isAndroid } from '../../../utils/device'
import { IMovie } from '../../../atoms/api/moviesTypes'
import Animated, {
  AnimateStyle,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { DEFAULT_VALUES } from '../constants'
import { useDrawerOpen } from '../../../atoms/drawerAtom'
import { useFocusMovieId } from '../../../atoms/api/moviesCategories'
import { buildStreamUrl } from '../../../atoms/api/utils'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'
import { FocusPressableWithFocus } from '../../focus-pressable/FocusPressable'
import { AnimatedViewScaleFocus } from '../../focus-pressable/AnimatedViewFocus'

interface IMovieCard {
  movie: IMovie
  hasTVPreferredFocus?: boolean
}
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)

interface IAnimatedImageBackgroundFocus extends PropsWithChildren {
  focus: boolean
  uri: string
  style?: StyleProp<AnimateStyle<ViewStyle>>
}
const AnimatedImageBackgroundFocus: React.FC<IAnimatedImageBackgroundFocus> = ({
  children,
  focus,
  uri,
  style,
}) => {
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focus ? 1 : 0.9, { duration: 100 }) }],
  }))

  return (
    <AnimatedImageBackground
      source={{
        uri: uri || '',
      }}
      resizeMode="contain"
      style={[animatedImageStyle, style]}
      imageStyle={[styles.imageStyle]}
    >
      {children}
    </AnimatedImageBackground>
  )
}

export const MovieCard: React.FC<IMovieCard> = ({
  movie,
  hasTVPreferredFocus,
}) => {
  const { account } = useSelectedAccount()
  const { setStream } = useSelectedStream()

  if (!account) {
    return null
  }

  const onPressItem = () => {
    const url = buildStreamUrl('movie', account, movie.stream_id)

    setStream({
      id: movie.stream_id,
      type: 'movies',
      title: movie.name,
      imageUrl: movie.stream_icon,
      url,
      info: movie,
    })
  }

  return (
    <FocusPressableWithFocus
      onPress={onPressItem}
      hasTVPreferredFocus={hasTVPreferredFocus}
    >
      {(focus) => (
        <AnimatedImageBackgroundFocus uri={movie.stream_icon} focus={focus}>
          <AnimatedViewScaleFocus
            focus={focus}
            style={{
              width: DEFAULT_VALUES.WIDTH,
              height: DEFAULT_VALUES.HEIGHT,
              justifyContent: 'flex-end',
            }}
          >
            <TextMovieComponent movie={movie} focus={focus} />
          </AnimatedViewScaleFocus>
        </AnimatedImageBackgroundFocus>
      )}
    </FocusPressableWithFocus>
  )
}

const TextMovieComponent: React.FC<{ focus: boolean; movie: IMovie }> = ({
  focus,
  movie,
}) => {
  const { setFocusMovieId } = useFocusMovieId()

  useEffect(() => {
    if (focus) {
      setFocusMovieId(movie.stream_id)
    }
  }, [focus])

  return (
    <Text size={12} numberOfLines={1}>
      {movie.name.length > 1 ? movie.name.split('|')[1] : movie.name}
    </Text>
  )
}

// backgroundColor: 'rgba(0,0,0,0.5)',

const styles = StyleSheet.create({
  container: {
    overflow: isAndroid ? 'hidden' : 'visible',
    flex: 1,
    borderRadius: 8,
    justifyContent: 'flex-end',
    width: DEFAULT_VALUES.WIDTH,
    height: DEFAULT_VALUES.HEIGHT,
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
