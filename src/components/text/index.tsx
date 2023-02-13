import React, { PropsWithChildren } from 'react'
import { Text as RNText } from 'react-native'
import { colors } from '../../utils/colors'

export type TFontSize = 40 | 32 | 30 | 24 | 20 | 16 | 14 | 12
type TLineHeight = 48 | 40 | 32 | 24 | 20 | 16

const fontSize: Record<TFontSize, TLineHeight> = {
  12: 16,
  14: 20,
  16: 24,
  20: 32,
  24: 32,
  30: 40,
  32: 40,
  40: 48,
}

interface IText {
  size: TFontSize
  color?: string
  bold?: boolean
  font?: 'CandyCake' | 'Cabin-Regular'
}
const Text: React.FC<PropsWithChildren & IText> = ({
  children,
  size,
  color,
  bold,
  font,
}) => {
  return (
    <RNText
      style={{
        fontFamily: font ?? 'Cabin-Regular',
        fontSize: size,
        lineHeight: fontSize[size],
        color: color || colors.white['0'],
        fontWeight: bold ? 'bold' : 'normal',
      }}
    >
      {children}
    </RNText>
  )
}

export default Text
