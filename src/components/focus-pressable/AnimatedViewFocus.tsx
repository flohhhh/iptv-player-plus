import { ImageStyle, StyleProp, TextStyle, View, ViewStyle } from 'react-native'
import React, { PropsWithChildren, useEffect } from 'react'
import Animated, {
  AnimatedStyleProp,
  AnimateStyle,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface IAnimatedViewFocus extends PropsWithChildren {
  focus: boolean
  style?: StyleProp<AnimateStyle<ViewStyle>>
}

export const AnimatedViewScaleFocus: React.FC<IAnimatedViewFocus> = ({
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

export const AnimatedViewScaleOpacity: React.FC<IAnimatedViewFocus> = ({
  children,
  focus,
  style,
}) => {
  const animatedImageStyle = useAnimatedStyle(() => ({
    opacity: withTiming(focus ? 1 : 0),
  }))

  return (
    <Animated.View style={[style, animatedImageStyle]}>
      {children}
    </Animated.View>
  )
}
