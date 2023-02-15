import React, { PropsWithChildren, useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { IProfile } from '../../atoms/profilesAtom'
import Text from '../text'
import { colors, getByColorKey, TFunColors } from '../../utils/colors'
import LinearGradient from 'react-native-linear-gradient'
import profiles from './index'
import { useFocusBlur } from '../../hooks/useFocusBlur'

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
