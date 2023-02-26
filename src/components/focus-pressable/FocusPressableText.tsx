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
  focusStyle?: ViewStyle
  onFocus?: () => void
  onBlur?: () => void
}
export const FocusPressableText: React.FC<IFocusPressable> = ({
  onPress,
  text,
  style,
  size,
  color,
  focusSize,
  focusStyle,
  focusColorText,
  onFocus,
  onBlur,
}) => {
  const { onFocus: onFocus1, onBlur: onBlur1, focus } = useFocusBlur()

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
      style={[style, focus ? focusStyle : undefined]}
    >
      <Text
        size={focus ? focusSize || size : size}
        color={focus ? focusColorText : color}
      >
        {text}
      </Text>
    </TouchableOpacity>
  )
}
