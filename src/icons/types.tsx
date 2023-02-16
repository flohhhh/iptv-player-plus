import { AnimateProps } from 'react-native-reanimated'
import { PathProps } from 'react-native-svg'

export interface IIcon extends IAnimated {
  size: number
  color?: string
}

export interface IAnimated {
  animated?: boolean
  animatedProps?: Partial<AnimateProps<PathProps>> | undefined
}
