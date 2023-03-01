import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import Text from '../../text'
import { useSelectedStream } from '../../../atoms/streams/streamsAtoms'
import { isAndroid } from '../../../utils/device'
import { IMovie } from '../../../atoms/api/moviesTypes'
import Animated, {
  AnimateStyle,
  StylesOrDefault,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { DEFAULT_VALUES } from '../constants'
import { useDrawerOpen } from '../../../atoms/drawerAtom'
import { useFocusMovieId } from '../../../atoms/api/moviesCategories'
import { buildStreamUrl } from '../../../atoms/api/utils'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'
import { FocusPressableWithFocus } from '../../focus-pressable/FocusPressable'

interface IMovieCard {
  movie: IMovie
}
const AnimatedImageBackground =
  Animated.createAnimatedComponent(ImageBackground)

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

interface IAnimatedImageBackgroundFocus extends PropsWithChildren {
  focus: boolean
  uri: string
}
const AnimatedImageBackgroundFocus: React.FC<IAnimatedImageBackgroundFocus> = ({
  children,
  focus,
  uri,
}) => {
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focus ? 1 : 0.9, { duration: 100 }) }],
  }))

  return (
    <AnimatedImageBackground
      source={{
        uri,
      }}
      resizeMode="contain"
      style={[animatedImageStyle]}
      imageStyle={[styles.imageStyle]}
    >
      {children}
    </AnimatedImageBackground>
  )
}

interface IAnimatedViewFocus extends PropsWithChildren {
  focus: boolean
  style?: StyleProp<AnimateStyle<StylesOrDefault<ViewStyle>>>
}

const { WIDTH, HEIGHT } = DEFAULT_VALUES

const AnimatedViewFocus: React.FC<IAnimatedViewFocus> = ({
  children,
  focus,
  style,
}) => {
  const animatedImageStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(focus ? 1 : 0.9, { duration: 100 }) }],
  }))

  return (
    <Animated.View style={[style, animatedImageStyle]}>
      {children}
    </Animated.View>
  )
}

export const MovieCard: React.FC<IMovieCard> = ({ movie }) => {
  const { account } = useSelectedAccount()
  const { setStream } = useSelectedStream()

  if (!account) {
    return null
  }

  const onPressItem = () => {
    const url = buildStreamUrl('movie', account, movie.stream_id)

    setStream({
      id: movie.stream_id,
      type: 'movie',
      title: movie.name,
      imageUrl: movie.stream_icon,
      url,
    })
  }

  return (
    <FocusPressableWithFocus onPress={onPressItem}>
      {(focus) => (
        <AnimatedImageBackgroundFocus uri={movie.stream_icon} focus={focus}>
          <AnimatedViewFocus
            focus={focus}
            style={{
              width: WIDTH,
              height: HEIGHT,
            }}
          >
            <TextMovieComponent movie={movie} focus={focus} />
          </AnimatedViewFocus>
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
  const { setDrawerOpen } = useDrawerOpen()

  useEffect(() => {
    if (focus) {
      setFocusMovieId(movie.stream_id)
      setDrawerOpen(false)
    }
  }, [focus])

  return (
    <Text size={12} style={styles.title} numberOfLines={1}>
      {movie.name.length > 1 ? movie.name.split('|')[1] : movie.name}
    </Text>
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
    // position: 'absolute',
    // paddingTop: 4,
    // paddingHorizontal: 2,
    // width: '100%',
    // backgroundColor: 'rgba(0,0,0,0.5)',
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
