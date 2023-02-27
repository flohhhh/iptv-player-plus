import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '../../../text'
import { SpacerX } from '../../../spacer'
import { colors } from '../../../../utils/colors'
import { useFocusBlur } from '../../../../hooks/useFocusBlur'
import { ProfileLinearGradient } from '../../../profiles/ProfileLinearGradient'
import {
  useSelectedProfile,
  useSelectedProfileSet,
  useSelectedProfileValue,
} from '../../../../atoms/profiles/profilesAtom'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import {useDrawerOpen, useSelectDrawerItem} from '../../../../atoms/drawerAtom'
import {Search} from "../../../../icons/Search";

interface IDrawerSearchItem {
  text: string
}
export const DrawerSearchItem: React.FC<IDrawerSearchItem> = ({ text }) => {
  const { drawerOpen } = useDrawerOpen()


  const {selectDrawerItem} = useSelectDrawerItem()
  const setProfile = useSelectedProfileSet()

  const { onFocus, onBlur, focus } = useFocusBlur()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerOpen ? 1 : 0),
  }))

  const onPressProfile = () => setProfile(null)

  return (
    <TouchableOpacity
      style={styles.selectedProfile}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={onPressProfile}
    >
      <SpacerX size={8} />
      <Search
        size={
          drawerOpen
            ? selectDrawerItem === "search"
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
      />

      <SpacerX size={8} />

      <Animated.View style={opacityAnimated}>
        <Text size={focus ? 14 : 12} bold={focus}>
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
