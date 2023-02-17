import React, { PropsWithChildren } from 'react'
import { getByColorKey, TFunColors } from '../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'

interface IProfileCard {
  color: TFunColors
}
export const ProfileLinearGradient: React.FC<
  PropsWithChildren & IProfileCard
> = ({ color, children }) => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        getByColorKey(color),
        getByColorKey(`${color}Secondary` as TFunColors),
      ]}
      style={{ borderRadius: 4 }}
    >
      {children}
    </LinearGradient>
  )
}
