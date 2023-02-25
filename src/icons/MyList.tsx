import { IIcon } from './types'
import React from 'react'
import Svg, { Path } from 'react-native-svg'

export const MyList: React.FC<IIcon> = ({ size, color = '#FFF' }) => {
  return (
    <Svg width={size} height={size} viewBox="0 0 1920 1920">
      <Path
        fillRule="evenodd"
        fill={color}
        d="M915.744 213v702.744H213v87.842h702.744v702.744h87.842v-702.744h702.744v-87.842h-702.744V213z"
      />
    </Svg>
  )
}
