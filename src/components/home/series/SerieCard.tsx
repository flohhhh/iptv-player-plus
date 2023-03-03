import { ImageBackground, StyleProp, StyleSheet, ViewStyle } from 'react-native'
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
import { useDrawerOpen } from '../../../atoms/drawerAtom'
import { buildStreamUrl } from '../../../atoms/api/utils'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'
import { FocusPressableWithFocus } from '../../focus-pressable/FocusPressable'
import { AnimatedViewScaleFocus } from '../../focus-pressable/AnimatedViewFocus'
import { ISerie } from '../../../atoms/api/seriesTypes'
import { useFocusSerieId } from '../../../atoms/api/seriesCategories'

interface ISerieCard {
  serie: ISerie
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
        uri,
      }}
      resizeMode="contain"
      style={[animatedImageStyle, style]}
      imageStyle={[styles.imageStyle]}
    >
      {children}
    </AnimatedImageBackground>
  )
}

export const SerieCard: React.FC<ISerieCard> = ({ serie }) => {
  const { account } = useSelectedAccount()
  const { setStream } = useSelectedStream()

  if (!account) {
    return null
  }

  const onPressItem = () => {
    const url = buildStreamUrl('series', account, serie.series_id)

    setStream({
      id: serie.series_id,
      type: 'series',
      title: serie.name,
      imageUrl: serie.cover,
      url,
      info: serie,
    })
  }

  return (
    <FocusPressableWithFocus onPress={onPressItem}>
      {(focus) => (
        <AnimatedImageBackgroundFocus uri={serie.cover} focus={focus}>
          <AnimatedViewScaleFocus
            focus={focus}
            style={{
              width: DEFAULT_VALUES.WIDTH,
              height: DEFAULT_VALUES.HEIGHT,
              justifyContent: 'flex-end',
            }}
          >
            <TextSerieComponent serie={serie} focus={focus} />
          </AnimatedViewScaleFocus>
        </AnimatedImageBackgroundFocus>
      )}
    </FocusPressableWithFocus>
  )
}

const TextSerieComponent: React.FC<{
  focus: boolean
  serie: ISerie
}> = ({ focus, serie }) => {
  const { setFocusSerieId } = useFocusSerieId()

  useEffect(() => {
    if (focus) {
      setFocusSerieId(serie.series_id)
    }
  }, [focus])

  return (
    <Text size={12} numberOfLines={1}>
      {serie.name.length > 1 ? serie.name.split('|')[1] : serie.name}
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
