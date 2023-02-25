import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Cross: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16 8l-8 8m0-8l8 8m5-4a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </Svg>
  )
}
