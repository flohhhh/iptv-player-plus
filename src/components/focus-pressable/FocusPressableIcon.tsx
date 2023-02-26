import React from 'react'
import { IIcon } from '../../icons/types'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { TouchableOpacity } from 'react-native'
import { IFocusPressable } from './FocusPressable'

export interface IFocusPressableIcon extends IFocusPressable {
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
