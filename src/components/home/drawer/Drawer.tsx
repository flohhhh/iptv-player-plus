import {
  StyleSheet,
  useTVEventHandler,
  useWindowDimensions,
  View,
} from 'react-native'
import React, { useEffect, useRef } from 'react'
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
import { DrawerItem, Wrapper } from './items/DrawerItem'
import { AnimatedViewScaleFocus } from '../../focus-pressable/AnimatedViewFocus'
import { FocusPressableWithFocus } from '../../focus-pressable/FocusPressable'

const SPACER_SIZE = 16

const config = {
  duration: 50,
  easing: Easing.ease,
}

interface IDrawer {}

export const Drawer: React.FC<IDrawer> = () => {
  const { t } = useTranslation()
  const { height } = useWindowDimensions()

  const profile = useSelectedProfileValue()
  const widthShared = useSharedValue(120)

  const myTVEventHandler = (e) => {
    e.eventType
  }

  useTVEventHandler(myTVEventHandler)

  const { drawerOpen } = useDrawerOpen()

  useEffect(() => {
    widthShared.value = drawerOpen ? 140 : 46
  }, [drawerOpen])

  const widthAnimated = useAnimatedStyle(() => ({
    width: withTiming(widthShared.value, config),
  }))

  if (!profile) {
    return null
  }

  return (
    <Animated.View style={[{ height }, styles.container, widthAnimated]}>
      <View style={{ flex: 1 }}>
        <DrawerProfileItem />

        <SpacerY size={SPACER_SIZE * 2} />
        <DrawerItem type="search" text={t('drawer.item.search')} />
        <SpacerY size={SPACER_SIZE} />
        <DrawerItem type="movies" text={t('drawer.item.movies')} />
        <SpacerY size={SPACER_SIZE} />
        <DrawerItem type="series" text={t('drawer.item.series')} />
        <SpacerY size={SPACER_SIZE} />
        {/*<DrawerItem type="live" text={t('drawer.item.live')} />*/}
        {/*<SpacerY size={SPACER_SIZE} />*/}
        <DrawerItem type="mylist" text={t('drawer.item.mylist')} />

        <SpacerY size={SPACER_SIZE * 4} />

        <DrawerDisconnectAccountItem />
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
  },
})
