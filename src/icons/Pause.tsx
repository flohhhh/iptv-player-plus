import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Pause: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1920 1920">
      <Path
        fillRule="evenodd"
        fill={color}
        d="M754.571 0v1920H206V0h548.571zm960 0v1920H1166V0h548.571z"
      ></Path>
    </Svg>
  )
}
