import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import React, { PropsWithChildren } from 'react'
import { IIcon } from '../../icons/types'

export interface IFocusPressable extends PropsWithChildren {
  onPress: () => void
  style?: StyleProp<ViewStyle> | undefined
  focusStyle?: ViewStyle
}
export const FocusPressable: React.FC<IFocusPressable> = ({
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
