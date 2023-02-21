import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../utils/colors'
import { DrawerItem, TDrawerItemType } from './DrawerItem'
import { SpacerY } from '../spacer'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useSelectedProfileValue } from '../../atoms/profiles/profilesAtom'
import { DrawerProfileItem } from './DrawerProfileItem'
import {
  useSelectDrawerItem,
  useSelectDrawerOpen,
} from '../../atoms/selectDrawerItemAtom'

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
  const [_, setSelectDrawerItem] = useSelectDrawerItem()

  const widthShared = useSharedValue(120)

  const [drawerIsOpen, setDrawerIsOpen] = useSelectDrawerOpen()

  useEffect(() => {
    widthShared.value = drawerIsOpen ? 110 : 46
  }, [drawerIsOpen])

  const widthAnimated = useAnimatedStyle(() => ({
    width: withTiming(widthShared.value, config),
  }))

  const onFocusItem = (type: TDrawerItemType, focus: boolean) => {
    setSelectDrawerItem(type)
    setDrawerIsOpen(true)
  }

  if (!profile) {
    return null
  }

  return (
    <Animated.View style={[{ height }, styles.container, widthAnimated]}>
      <DrawerProfileItem />

      <SpacerY size={SPACER_SIZE * 2} />

      <DrawerItem
        type="movie"
        text={t('common.movies')}
        drawerIsOpen={drawerIsOpen}
        onFocusItem={onFocusItem}
      />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem
        type="tvshow"
        text={t('common.series')}
        drawerIsOpen={drawerIsOpen}
        onFocusItem={onFocusItem}
      />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem
        type="canal"
        text={t('common.canal')}
        drawerIsOpen={drawerIsOpen}
        onFocusItem={onFocusItem}
      />
      <SpacerY size={SPACER_SIZE} />
      <DrawerItem
        type="mylist"
        text={t('common.mylist')}
        drawerIsOpen={drawerIsOpen}
        onFocusItem={onFocusItem}
      />
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
