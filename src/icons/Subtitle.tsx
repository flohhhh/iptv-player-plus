import { IIcon } from './types'
import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

export const Subtitle: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 48 48">
      <G data-name="Layer 2">
        <Path fill={color} d="M0 0H48V48H0z" data-name="invisible box"></Path>
        <G data-name="icons Q2">
          <Path d="M44 6H4a2 2 0 00-2 2v32a2 2 0 002 2h40a2 2 0 002-2V8a2 2 0 00-2-2zm-2 32H6V10h36z"></Path>
          <Path d="M12 36h14a2 2 0 000-4H12a2 2 0 000 4zM36 32h-4a2 2 0 000 4h4a2 2 0 000-4zM22 30h14a2 2 0 000-4H22a2 2 0 000 4zM12 30h4a2 2 0 000-4h-4a2 2 0 000 4z"></Path>
        </G>
      </G>
    </Svg>
  )
}
