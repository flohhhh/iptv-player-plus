import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Movie: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg x="0" y="0" width={size} height={size} viewBox="0 0 122.88 110.35">
      <Path
        fill={color}
        d="M61.44 37.35c9.84 0 17.82 7.98 17.82 17.82s-7.98 17.82-17.82 17.82-17.82-7.98-17.82-17.82 7.98-17.82 17.82-17.82zM6.32 0v6.22h12.22V0h6.32v14.88h73.15V0h6.32v6.22h12.22V0h6.32v110.35h-6.32v-7.19h-12.22v7.19h-6.32V94.79H24.87v15.56h-6.32v-7.19H6.32v7.19H0V0h6.32zm91.69 21.2H24.87v67.27h73.15V21.2h-.01zm18.55 75.64v-11.8h-12.22v11.8h12.22zm0-18.12v-11.8h-12.22v11.8h12.22zm0-18.13v-11.8h-12.22v11.8h12.22zm0-18.12v-11.8h-12.22v11.8h12.22zm0-18.12v-11.8h-12.22v11.8h12.22zM18.54 96.84v-11.8H6.32v11.8h12.22zm0-18.12v-11.8H6.32v11.8h12.22zm0-18.13v-11.8H6.32v11.8h12.22zm0-18.12v-11.8H6.32v11.8h12.22zm0-18.12v-11.8H6.32v11.8h12.22zm51.81 30.81l-14.03 9.42v-18.7l14.03 9.28z"
      />
    </Svg>
  )
}
