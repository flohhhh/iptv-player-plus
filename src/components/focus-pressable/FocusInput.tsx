import { TextInput, TextInputProps, ViewStyle } from 'react-native'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import React, { PropsWithChildren } from 'react'

type TInputProps = TextInputProps & PropsWithChildren
interface IFocusInput extends TInputProps {
  focusStyle?: ViewStyle
}
export const FocusInput: React.FC<IFocusInput> = ({
  focusStyle,
  style,
  ...props
}) => {
  const { onFocus, onBlur, focus } = useFocusBlur()

  return (
    <TextInput
      style={[style, focus ? focusStyle : undefined]}
      onFocus={onFocus}
      onBlur={onBlur}
      {...props}
    />
  )
}
