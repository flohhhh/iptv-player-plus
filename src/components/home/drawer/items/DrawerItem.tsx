import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Text from '../../../text'
import { SpacerX } from '../../../spacer'
import { useFocusBlur } from '../../../../hooks/useFocusBlur'
import { useSelectedProfileSet } from '../../../../atoms/profiles/profilesAtom'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import {
  useDrawerOpen,
  useSelectDrawerItem,
} from '../../../../atoms/drawerAtom'
import { DEFAULT_SIZE, iconByType } from './constants'
import { TDrawerItemType } from '../types'

interface IDrawerSearchItem {
  text: string
  type: TDrawerItemType
}
export const DrawerItem: React.FC<IDrawerSearchItem> = ({ text, type }) => {
  const { setSelectDrawerItem } = useSelectDrawerItem()
  const { drawerOpen, setDrawerOpen } = useDrawerOpen()

  const { selectDrawerItem } = useSelectDrawerItem()

  const { onFocus: onFocusFunc, onBlur: onBlurFunc, focus } = useFocusBlur()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerOpen ? 1 : 0),
  }))

  const onPressProfile = () => {
    setSelectDrawerItem(type)
  }

  const Icon = iconByType[type]

  const onFocus = () => {
    onFocusFunc()
    setDrawerOpen(true)
  }

  return (
    <TouchableOpacity
      style={styles.selectedProfile}
      onFocus={onFocus}
      onBlur={onBlurFunc}
      onPress={onPressProfile}
    >
      <SpacerX size={8} />
      <Icon
        size={
          drawerOpen
            ? focus || selectDrawerItem === 'search'
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE
        }
      />

      <SpacerX size={8} />

      <Animated.View style={opacityAnimated}>
        <Text font="CandyCake" size={focus ? DEFAULT_SIZE + 2 : DEFAULT_SIZE}>
          {text}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  selectedProfile: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareProfile: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
})
