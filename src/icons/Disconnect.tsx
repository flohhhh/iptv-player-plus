import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Disconnect: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} fill="none" viewBox="0 0 36 36">
      <Path
        fill={color}
        d="M12.17 6A6.21 6.21 0 006 11H2.13v2H6a6.23 6.23 0 006.21 5H17V6zm2.93 10h-2.93a4.2 4.2 0 01-4.31-4 4.17 4.17 0 014.31-4h2.93z"
      />
      <Path
        fill={color}
        d="M33.92 23h-3.78a6.25 6.25 0 00-6.21-5H19v2h-5a1 1 0 100 2h5v4h-5a1 1 0 00-1 1 1 1 0 001 1h5v2h4.94a6.23 6.23 0 006.22-5h3.76zm-10 5H21v-8h2.94a4.17 4.17 0 014.31 4 4.17 4.17 0 01-4.31 4z"
      ></Path>
      <Path fill="none" d="M0 0H36V36H0z" />
    </Svg>
  )
}
