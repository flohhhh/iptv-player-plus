import { IIcon } from './types'
import React from 'react'
import Svg, { G, Path } from 'react-native-svg'

export const ChangeTrack: React.FC<IIcon> = ({ size, color = '#000' }) => {
  return (
    <Svg viewBox="0 0 271.88 271.88" width={size} height={size}>
      <G fill={color}>
        <Path d="M235.095 70.164l8.437-8.437L181.811 0v184.973c-4.32-2.667-9.541-4.093-15.412-4.093-13.921 0-29.966 7.739-42.938 20.711-21.296 21.29-27.09 48.857-13.187 62.765 4.923 4.923 11.773 7.524 19.81 7.524 13.921 0 29.978-7.739 42.95-20.711 13.151-13.157 20.371-28.701 20.705-41.941h.006v-.125c.006-.298 0-.591 0-.883V28.808l41.35 41.356z"></Path>
        <Path d="M28.349 13.127H122.327V25.061H28.349z" />
        <Path d="M28.349 35.998H122.327V47.931999999999995H28.349z"></Path>
        <Path d="M28.349 59.866H122.327V71.8H28.349z"></Path>
      </G>
    </Svg>
  )
}
