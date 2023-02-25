import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import React, { PropsWithChildren } from 'react'
import { IIcon } from '../../icons/types'

interface IFocusPressable extends PropsWithChildren {
  onPress: () => void
  style?: StyleProp<ViewStyle> | undefined
  focusStyle?: ViewStyle
}
const FocusPressable: React.FC<IFocusPressable> = ({
  children,
  onPress,
  style,
  focusStyle,
}) => {
  const { onFocus, onBlur, focus } = useFocusBlur()

  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      style={[style, focus ? focusStyle : undefined]}
    >
      {children}
    </TouchableOpacity>
  )
}

interface IFocusPressableIcon extends IFocusPressable {
  Icon: React.FC<IIcon>
  sizeIcon: number
  color?: string
  focusColor?: string
}
export const FocusPressableIcon: React.FC<IFocusPressableIcon> = ({
  onPress,
  focusStyle,
  Icon,
  sizeIcon,
  color,
  focusColor,
}) => {
  const { onFocus, onBlur, focus } = useFocusBlur()

  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      style={focus ? focusStyle : undefined}
    >
      <Icon size={sizeIcon} color={focus ? focusColor : color} />
    </TouchableOpacity>
  )
}

export default FocusPressable
