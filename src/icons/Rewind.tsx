import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Rewind: React.FC<IIcon> = ({ size, color = '#000' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Path fill={color} d="M16 15V1L8 8zM8 15V1L0 8z" />
    </Svg>
  )
}
