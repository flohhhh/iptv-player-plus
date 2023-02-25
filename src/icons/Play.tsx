import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Play: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1920 1920">
      <Path
        fill={color}
        fillRule="evenodd"
        d="M175 .024V1920l1570.845-959.927z"
      />
    </Svg>
  )
}
