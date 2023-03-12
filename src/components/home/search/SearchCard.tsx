import {
  ImageBackground,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import Text from '../../text'
import { useSelectedStream } from '../../../atoms/streams/streamsAtoms'
import { isAndroid } from '../../../utils/device'
import Animated, {
  AnimateStyle,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated'
import { DEFAULT_VALUES } from '../constants'
import { useFocusMovieId } from '../../../atoms/api/moviesCategories'
import { buildStreamUrl } from '../../../atoms/api/utils'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'
import { FocusPressableWithFocus } from '../../focus-pressable/FocusPressable'
import { AnimatedViewScaleFocus } from '../../focus-pressable/AnimatedViewFocus'
import { IGenericByCategory } from '../../../atoms/api/types'
import { Image } from '../../../icons/Image'
import { colors } from '../../../utils/colors'

export interface ISearchStream extends IGenericByCategory {
  streamId: number
  coverUri: string
  type: 'movies' | 'series'
}

interface ISearchCard {
  item: ISearchStream
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
        uri: uri,
      }}
      resizeMode="contain"
      style={[animatedImageStyle, style]}
      imageStyle={[styles.imageStyle]}
    >
      {children}
    </AnimatedImageBackground>
  )
}

export const SearchCard: React.FC<ISearchCard> = ({
  item,
  hasTVPreferredFocus,
}) => {
  const { account } = useSelectedAccount()
  const { setStream } = useSelectedStream()

  if (!account) {
    return null
  }

  const onPressItem = () => {
    const url = buildStreamUrl('movie', account, item.streamId)

    setStream({
      id: item.streamId,
      type: 'movies',
      title: item.name,
      imageUrl: item.coverUri,
      url,
    })
  }

  return (
    <FocusPressableWithFocus
      onPress={onPressItem}
      hasTVPreferredFocus={hasTVPreferredFocus}
    >
      {(focus) => {
        return item.coverUri && item.coverUri.length > 0 ? (
          <AnimatedImageBackgroundFocus uri={item.coverUri} focus={focus}>
            <AnimatedViewScaleFocus
              focus={focus}
              style={{
                width: DEFAULT_VALUES.WIDTH,
                height: DEFAULT_VALUES.HEIGHT,
                justifyContent: 'flex-end',
              }}
            />
          </AnimatedImageBackgroundFocus>
        ) : (
          <>
            <View
              style={{
                width: DEFAULT_VALUES.WIDTH,
                height: DEFAULT_VALUES.HEIGHT,
                justifyContent: 'flex-end',
                backgroundColor: colors.gray[3],
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  left: '32%',
                  top: '34%',
                }}
              >
                <Image size={48} />
              </View>
              <TextMovieComponent item={item} focus={focus} />
            </View>
          </>
        )
      }}
    </FocusPressableWithFocus>
  )
}

const TextMovieComponent: React.FC<{ focus: boolean; item: ISearchStream }> = ({
  focus,
  item,
}) => {
  const { setFocusMovieId } = useFocusMovieId()

  useEffect(() => {
    if (focus) {
      setFocusMovieId(item.streamId)
    }
  }, [focus])

  return (
    <Text size={12} numberOfLines={1}>
      {item.name.length > 1 ? item.name.split('|')[1] : item.name}
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
