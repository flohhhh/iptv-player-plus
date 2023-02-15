import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../utils/colors'
import { DrawerItem } from './DrawerItem'
import { SpacerY } from '../spacer'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSelectedProfileValue } from '../../atoms/profilesAtom'
import { DrawerProfileItem } from './DrawerProfileItem'

const SPACER_SIZE = 16

const config = {
  duration: 100,
  easing: Easing.ease,
}
export const Drawer = () => {
  const { t } = useTranslation()
  const { height } = useWindowDimensions()
  const profile = useSelectedProfileValue()

  const widthShared = useSharedValue(120)

  const drawerIsOpen = true

  useEffect(() => {
    widthShared.value = drawerIsOpen ? 110 : 40
  }, [drawerIsOpen])

  const widthAnimated = useAnimatedStyle(() => ({
    width: withTiming(widthShared.value, config),
  }))

  const onFocusDrawerItem = (focus: boolean) => {}

  if (!profile) {
    return null
  }

  return (
    <Animated.View style={[{ height }, styles.container, widthAnimated]}>
      <DrawerProfileItem />

      <SpacerY size={SPACER_SIZE * 2} />

      <DrawerItem text={t('common.movies')} type="movie" drawerIsOpen />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem text={t('common.series')} type="tvshow" drawerIsOpen />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem text={t('common.canal')} type="canal" drawerIsOpen />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem text={t('common.mylist')} type="mylist" drawerIsOpen />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    backgroundColor: colors.black['1'],
    borderRadius: 4,
    alignItems: 'center',
  },
})
