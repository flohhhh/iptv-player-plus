import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { DrawerItem, TDrawerItemType } from './DrawerItem'
import { SpacerY } from '../../spacer'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSelectedProfileValue } from '../../../atoms/profiles/profilesAtom'
import { DrawerProfileItem } from './DrawerProfileItem'
import {
  useDrawerOpen,
  useSelectDrawerItem,
} from '../../../atoms/selectDrawerItemAtom'
import { DrawerDisconnectAccountItem } from './DrawerDisconnectAccountItem'

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
  const { setSelectDrawerItem } = useSelectDrawerItem()

  const widthShared = useSharedValue(120)

  const { drawerOpen, setDrawerOpen } = useDrawerOpen()

  useEffect(() => {
    widthShared.value = drawerOpen ? 110 : 46
  }, [drawerOpen])

  const widthAnimated = useAnimatedStyle(() => ({
    width: withTiming(widthShared.value, config),
  }))

  const onFocusItem = (type: TDrawerItemType, focus: boolean) => {
    setSelectDrawerItem(type)
    setDrawerOpen(true)
  }

  if (!profile) {
    return null
  }

  return (
    <Animated.View style={[{ height }, styles.container, widthAnimated]}>
      <DrawerProfileItem />

      <SpacerY size={SPACER_SIZE * 2} />

      <DrawerItem
        type="search"
        text={t('drawer.item.search')}
        onFocusItem={onFocusItem}
      />
      <SpacerY size={SPACER_SIZE} />

      <DrawerItem
        type="movie"
        text={t('drawer.item.movies')}
        onFocusItem={onFocusItem}
      />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem
        type="tvshow"
        text={t('drawer.item.series')}
        onFocusItem={onFocusItem}
      />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem
        type="canal"
        text={t('drawer.item.canal')}
        onFocusItem={onFocusItem}
      />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem
        type="mylist"
        text={t('drawer.item.mylist')}
        onFocusItem={onFocusItem}
      />

      <SpacerY size={SPACER_SIZE + 2} />

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
