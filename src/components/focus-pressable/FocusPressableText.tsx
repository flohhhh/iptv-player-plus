import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import React from 'react'
import Text, { TFontSize } from '../text'
import { TFunColors } from '../../utils/colors'

export interface IFocusPressable {
  onPress: () => void
  style?: StyleProp<ViewStyle> | undefined
  text: string
  size: TFontSize
  color: string
  focusSize?: TFontSize
  focusColorText?: string
  onFocus?: () => void
  onBlur?: () => void
  focusStyle?: ViewStyle
  forceFocusStyle?: boolean
}
export const FocusPressableText: React.FC<IFocusPressable> = ({
  onPress,
  text,
  style,
  size,
  color,
  focusSize,
  focusStyle,
  forceFocusStyle,
  focusColorText,
  onFocus,
  onBlur,
}) => {
  const { onFocus: onFocus1, onBlur: onBlur1, focus } = useFocusBlur()

  const focused = focus || forceFocusStyle
  return (
    <TouchableOpacity
      onPress={onPress}
      onFocus={() => {
        onFocus?.()
        onFocus1()
      }}
      onBlur={() => {
        onBlur?.()
        onBlur1()
      }}
      style={[style, focused ? focusStyle : undefined]}
    >
      <Text
        size={focused ? focusSize || size : size}
        color={focused ? focusColorText : color}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
