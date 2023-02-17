import { StyleSheet, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../utils/colors'
import { DrawerItem, TType } from './DrawerItem'
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
const itemsFocus: Record<TType, boolean> = {
  movie: false,
  tvshow: false,
  mylist: false,
  canal: false,
}

export const Drawer = () => {
  const { t } = useTranslation()
  const { height } = useWindowDimensions()
  const profile = useSelectedProfileValue()

  const widthShared = useSharedValue(120)

  const [drawerIsOpen, setDrawerIsOpen] = useState(false)

  useEffect(() => {
    widthShared.value = drawerIsOpen ? 110 : 46
  }, [drawerIsOpen])

  const widthAnimated = useAnimatedStyle(() => ({
    width: withTiming(widthShared.value, config),
  }))

  const onFocusItem = (type: TType, focus: boolean) => {
    itemsFocus[type] = focus
    const isFocused = Object.values(itemsFocus).some((f) => f)
    setDrawerIsOpen(isFocused)
  }

  if (!profile) {
    return null
  }

  return (
    <Animated.View style={[{ height }, styles.container, widthAnimated]}>
      <DrawerProfileItem drawerIsOpen={drawerIsOpen} />

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
    backgroundColor: colors.black['1'],
    borderRadius: 4,
    alignItems: 'center',
  },
})
