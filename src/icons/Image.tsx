import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Image: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg
      width={size}
      height={size}
      fill="#fff"
      stroke="#fff"
      viewBox="0 0 24 24"
    >
      <Path d="M21 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1zM7 7a2 2 0 11-2 2 2 2 0 012-2zm13 11H4v-1.667L8 13l2.857 2.143L16 10l4 5.333z" />
    </Svg>
  )
}
