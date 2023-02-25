import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Favorite: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 32 32">
      <Path d="M22.45 6a5.47 5.47 0 013.91 1.64 5.7 5.7 0 010 8L16 26.13 5.64 15.64a5.7 5.7 0 010-8 5.48 5.48 0 017.82 0l2.54 2.6 2.53-2.58A5.44 5.44 0 0122.45 6m0-2a7.47 7.47 0 00-5.34 2.24L16 7.36l-1.11-1.12a7.49 7.49 0 00-10.68 0 7.72 7.72 0 000 10.82L16 29l11.79-11.94a7.72 7.72 0 000-10.82A7.49 7.49 0 0022.45 4z" />
      <Path d="M0 0H32V32H0z" />
    </Svg>
  )
}
