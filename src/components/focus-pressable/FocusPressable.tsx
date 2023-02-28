import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import React, { PropsWithChildren, ReactNode } from 'react'

export interface IFocusPressable extends PropsWithChildren {
  onPress: () => void
  style?: StyleProp<ViewStyle> | undefined
  focusStyle?: ViewStyle
  onFocus?: () => void
}
export const FocusPressable: React.FC<IFocusPressable> = ({
  children,
  onPress,
  style,
  focusStyle,
  onFocus,
}) => {
  const { onFocus: onFocusFunc, onBlur, focus } = useFocusBlur()

  const onFocusChange = () => {
    onFocusFunc()
    onFocus?.()
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={onFocusChange}
      onBlur={onBlur}
      style={[style, focus ? focusStyle : undefined]}
    >
      {children}
    </TouchableOpacity>
  )
}

export interface IFocusPressableFocus {
  children: (v: any) => ReactNode | undefined
  onPress?: () => void
  style?: StyleProp<ViewStyle> | undefined
}

export const FocusPressableWithFocus: React.FC<IFocusPressableFocus> = ({
  children,
  onPress,
  style,
}) => {
  const { onFocus, onBlur, focus } = useFocusBlur()

  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={onFocus}
      onBlur={onBlur}
      style={style}
    >
      {children(focus)}
    </TouchableOpacity>
  )
}
