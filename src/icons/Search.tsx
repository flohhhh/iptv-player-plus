import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Search: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 50 50">
      <Path
        fill={color}
        d="M21 3C11.621 3 4 10.621 4 20s7.621 17 17 17c3.71 0 7.14-1.195 9.938-3.219l13.156 13.125 2.812-2.812-13-13.032A16.923 16.923 0 0038 20c0-9.379-7.621-17-17-17zm0 2c8.297 0 15 6.703 15 15s-6.703 15-15 15S6 28.297 6 20 12.703 5 21 5z"
      ></Path>
    </Svg>
  )
}
