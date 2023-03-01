import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Text from '../../../text'
import { SpacerX } from '../../../spacer'
import { useFocusBlur } from '../../../../hooks/useFocusBlur'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import {
  useDrawerOpen,
  useSelectDrawerItem,
} from '../../../../atoms/drawerAtom'
import { DEFAULT_SIZE, iconByType } from './constants'
import { TDrawerItemType } from '../types'
import { FocusPressableWithFocus } from '../../../focus-pressable/FocusPressable'
import { colors } from '../../../../utils/colors'

interface IDrawerSearchItem {
  text: string
  type: TDrawerItemType
}
export const DrawerItem: React.FC<IDrawerSearchItem> = ({ text, type }) => {
  const { setSelectDrawerItem } = useSelectDrawerItem()

  const onPressProfile = () => {
    setSelectDrawerItem(type)
  }

  return (
    <FocusPressableWithFocus onPress={onPressProfile}>
      {(focus) => <Wrapper focus={focus} type={type} text={text} />}
    </FocusPressableWithFocus>
  )
}

const Wrapper: React.FC<{
  type: TDrawerItemType
  focus: boolean
  text: string
}> = ({ type, focus, text }) => {
  const { drawerOpen, setDrawerOpen } = useDrawerOpen()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerOpen ? 1 : 0),
  }))

  const { selectDrawerItem } = useSelectDrawerItem()
  const Icon = iconByType[type]

  useEffect(() => {
    if (focus) {
      setDrawerOpen(true)
    }
  }, [focus])

  return (
    <View
      style={[
        styles.selectedProfile,
        {
          borderLeftColor:
            focus || selectDrawerItem === type
              ? colors.white['0']
              : colors.black['0'],
        },
      ]}
      hasTVPreferredFocus={selectDrawerItem === type}
    >
      <SpacerX size={8} />
      <Icon size={!drawerOpen || focus ? DEFAULT_SIZE + 2 : DEFAULT_SIZE} />

      <SpacerX size={8} />

      <Animated.View style={opacityAnimated}>
        <Text font="CandyCake" size={focus ? DEFAULT_SIZE + 2 : DEFAULT_SIZE}>
          {text}
        </Text>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  selectedProfile: {
    flexDirection: 'row',
    height: 24,
    alignItems: 'center',

    borderLeftWidth: 1,
  },
  squareProfile: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
})
