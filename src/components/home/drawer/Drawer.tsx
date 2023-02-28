import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { SpacerY } from '../../spacer'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSelectedProfileValue } from '../../../atoms/profiles/profilesAtom'
import { DrawerProfileItem } from './items/DrawerProfileItem'
import { useDrawerOpen } from '../../../atoms/drawerAtom'
import { DrawerDisconnectAccountItem } from './items/DrawerDisconnectAccountItem'
import { DrawerItem } from './items/DrawerItem'

const SPACER_SIZE = 16

const config = {
  duration: 100,
  easing: Easing.ease,
}

interface IDrawer {}

export const Drawer: React.FC<IDrawer> = () => {
  const { t } = useTranslation()
  const { height } = useWindowDimensions()

  const profile = useSelectedProfileValue()
  const widthShared = useSharedValue(120)

  const { drawerOpen } = useDrawerOpen()

  useEffect(() => {
    widthShared.value = drawerOpen ? 110 : 46
  }, [drawerOpen])

  const widthAnimated = useAnimatedStyle(() => ({
    width: withTiming(widthShared.value, config),
  }))

  if (!profile) {
    return null
  }

  return (
    <Animated.View style={[{ height }, styles.container, widthAnimated]}>
      <DrawerProfileItem />

      <SpacerY size={SPACER_SIZE * 2} />
      <DrawerItem type="search" text={t('drawer.item.search')} />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem type="movies" text={t('drawer.item.movies')} />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem type="series" text={t('drawer.item.series')} />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem type="live" text={t('drawer.item.live')} />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem type="mylist" text={t('drawer.item.mylist')} />

      <SpacerY size={SPACER_SIZE * 4} />

      <DrawerDisconnectAccountItem />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
})
