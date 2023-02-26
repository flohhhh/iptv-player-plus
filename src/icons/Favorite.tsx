import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const Favorite: React.FC<IIcon & { borderColor: string }> = ({
  size,
  borderColor,
  color = '#FFF',
}) => {
  return (
    <Svg width={size} height={size} fill={color} viewBox="0 0 24 24">
      <Path
        stroke={borderColor}
        strokeWidth="1.5"
        d="M11.97 22c.606 0 .948-.53 1.925-1.565 1.22-1.295 2.397-2.501 3.251-3.408 2.523-2.676 3.515-3.691 4.219-4.484 1.87-2.105 2.113-5.03.845-7.252C20.61 2.491 18.225 2 16.942 2s-2.2.492-3.82 1.757L12 4.808l-1.093-1.051C9.15 2.255 7.876 2 7.06 2c-.68 0-3.525 0-5.358 3.291-1.338 2.402-.639 5.36 1.065 7.252.305.34 1.563 1.657 3.745 4.029.878.955 2.122 2.269 3.037 3.266.518.565 1.815 2.162 2.421 2.162z"
        clipRule="evenodd"
      />
    </Svg>
  )
}
