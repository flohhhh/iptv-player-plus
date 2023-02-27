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
import { Search } from '../../../../icons/Search'
import { DEFAULT_SIZE, iconByType } from './constants'
import { IIcon } from '../../../../icons/types'
import { TDrawerItemType } from '../types'

interface IDrawerSearchItem {
  text: string
  type: TDrawerItemType
}
export const DrawerSearchItem: React.FC<IDrawerSearchItem> = ({
  text,
  type,
}) => {
  const { drawerOpen } = useDrawerOpen()

  const { selectDrawerItem } = useSelectDrawerItem()
  const setProfile = useSelectedProfileSet()

  const { onFocus, onBlur, focus } = useFocusBlur()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerOpen ? 1 : 0),
  }))

  const onPressProfile = () => setProfile(null)

  const Icon = iconByType[type]
  console.log('----Icon', Icon)

  return (
    <TouchableOpacity
      style={styles.selectedProfile}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={onPressProfile}
    >
      <SpacerX size={8} />
      <Icon
        size={
          drawerOpen
            ? selectDrawerItem === 'search'
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE
        }
      />

      <SpacerX size={8} />

      <Animated.View style={opacityAnimated}>
        <Text size={focus ? DEFAULT_SIZE : DEFAULT_SIZE} bold={focus}>
          {text}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
  },
  selectedProfile: {
    width: '100%',
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
