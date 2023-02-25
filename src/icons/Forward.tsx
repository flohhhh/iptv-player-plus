import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Forward: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path fill={color} d="M0 1v14l8-7zM8 1v14l8-7z" />
    </Svg>
  )
}
