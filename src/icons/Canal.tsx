import { IIcon } from './types'
import React from 'react'
import Svg, { Circle, Path } from 'react-native-svg'

export const Canal: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 24 24">
      <Circle
        fill={color}
        cx="12"
        cy="12"
        r="8"
        stroke="#000"
        strokeWidth="1.5"
      ></Circle>
      <Path
        stroke={color}
        strokeWidth="1.5"
        d="M17.5 6.348c2.297-.538 3.945-.476 4.338.312.73 1.466-3.158 4.89-8.687 7.645-5.528 2.757-10.602 3.802-11.333 2.336-.392-.786.544-2.134 2.349-3.64"
      />
      <Path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M9.5 10.51l.01-.011"
      />
    </Svg>
  )
}
