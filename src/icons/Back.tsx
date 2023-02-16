import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'
import Animated from 'react-native-reanimated'

export const Back: React.FC<IIcon> = ({
  size,
  color = '#FFF',
  animatedProps,
}) => {
  const AnimatedPath = animatedProps
    ? Animated.createAnimatedComponent(Path)
    : Path
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 500 500">
      <AnimatedPath
        animatedProps={animatedProps}
        d="M109.576 219.151c60.419 0 109.573-49.156 109.573-109.576C219.149 49.156 169.995 0 109.576 0S.002 49.156.002 109.575c0 60.42 49.155 109.576 109.574 109.576zm0-204.151c52.148 0 94.573 42.426 94.574 94.575 0 52.149-42.425 94.575-94.574 94.576-52.148-.001-94.573-42.427-94.573-94.577C15.003 57.427 57.428 15 109.576 15z"
      />
      <AnimatedPath
        animatedProps={animatedProps}
        d="M94.861 156.507a7.502 7.502 0 0010.606 0 7.499 7.499 0 00-.001-10.608l-28.82-28.819 83.457-.008a7.5 7.5 0 00-.001-15l-83.46.008 28.827-28.825a7.5 7.5 0 00-10.607-10.608l-41.629 41.628a7.495 7.495 0 00-2.197 5.303 7.51 7.51 0 002.198 5.305l41.627 41.624z"
      />
    </Svg>
  )
}
