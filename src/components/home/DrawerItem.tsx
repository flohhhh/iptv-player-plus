import { StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Text from '../text'
import { TvShow } from '../../icons/TvShow'
import { SpacerX } from '../spacer'
import { Canal } from '../../icons/Canal'
import { MyList } from '../../icons/MyList'
import { Movie } from '../../icons/Movie'
import { colors } from '../../utils/colors'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useFocusBlur } from '../../hooks/useFocusBlur'

export type TType = 'movie' | 'tvshow' | 'canal' | 'mylist'
interface IDrawerItem {
  text: string
  type: TType
  selected?: boolean
  drawerIsOpen: boolean
  onFocusItem: (type: TType, value: boolean) => void
}

const DEFAULT_SIZE = 14

const iconByType: Record<
  TType,
  (selected: boolean, drawerIsOpen: boolean) => () => JSX.Element
> = {
  movie: (selected, drawerIsOpen) => () =>
    (
      <Movie
        size={
          drawerIsOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
        color="white"
      />
    ),
  tvshow: (selected, drawerIsOpen) => () =>
    (
      <TvShow
        size={
          drawerIsOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
        color="white"
      />
    ),
  canal: (selected, drawerIsOpen) => () =>
    (
      <Canal
        size={
          drawerIsOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
        color="white"
      />
    ),
  mylist: (selected, drawerIsOpen) => () =>
    (
      <MyList
        size={
          drawerIsOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
        color="white"
      />
    ),
}

export const DrawerItem: React.FC<IDrawerItem> = ({
  text,
  type,
  selected,
  drawerIsOpen = false,
  onFocusItem,
}) => {
  const refTouchable = useRef<TouchableOpacity | null>(null)
  const { onFocus, onBlur, focus } = useFocusBlur()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerIsOpen ? 1 : 0),
  }))

  const Icon = iconByType[type](focus, drawerIsOpen)

  const onFocusChange = () => {
    onFocus()
    onFocusItem(type, true)
  }

  const onBlurChange = () => {
    onBlur()
    onFocusItem(type, false)
  }

  useEffect(() => {
    if (refTouchable) {
      refTouchable.current?.setNativeProps({ hasTVPreferredFocus: selected })
    }
  }, [refTouchable, selected])

  return (
    <TouchableOpacity
      ref={refTouchable}
      style={[
        styles.container,
        { borderLeftColor: focus ? colors.white['0'] : colors.black['1'] },
      ]}
      activeOpacity={1}
      onFocus={onFocusChange}
      onBlur={onBlurChange}
    >
      <SpacerX size={8} />

      <Icon />

      <SpacerX size={20} />

      <Animated.View style={opacityAnimated}>
        <Text size={focus ? 14 : 12}>{text}</Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
  },
})
