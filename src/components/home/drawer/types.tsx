import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef } from 'react'
import Text from '../../text'
import { TvShow } from '../../../icons/TvShow'
import { SpacerX } from '../../spacer'
import { Canal } from '../../../icons/Canal'
import { MyList } from '../../../icons/MyList'
import { Movie } from '../../../icons/Movie'
import { colors } from '../../../utils/colors'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useFocusBlur } from '../../../hooks/useFocusBlur'
import { useDrawerOpen, useSelectDrawerItem } from '../../../atoms/drawerAtom'
import { Search } from '../../../icons/Search'


interface IDrawerItem {
  text: string
  type: TDrawerItemType
}

const DEFAULT_SIZE = 14

const iconByType: Record<
  TDrawerItemType,
  (selected: boolean, drawerOpen: boolean) => () => JSX.Element
> = {
  search: (selected, drawerOpen) => () =>
    (
      <Search
        size={
          drawerOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
      />
    ),
  movies: (selected, drawerOpen) => () =>
    (
      <Movie
        size={
          drawerOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
      />
    ),
  series: (selected, drawerOpen) => () =>
    (
      <TvShow
        size={
          drawerOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
      />
    ),
  live: (selected, drawerOpen) => () =>
    (
      <Canal
        size={
          drawerOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
      />
    ),
  mylist: (selected, drawerOpen) => () =>
    (
      <MyList
        size={
          drawerOpen
            ? selected
              ? DEFAULT_SIZE + 2
              : DEFAULT_SIZE
            : DEFAULT_SIZE + 8
        }
      />
    ),
}

export const DrawerItem: React.FC<IDrawerItem> = ({ text, type }) => {
  const { drawerOpen } = useDrawerOpen()
  const { selectDrawerItem, setSelectDrawerItem } = useSelectDrawerItem()

  const refTouchable = useRef<TouchableOpacity | null>(null)
  const { onFocus, onBlur, focus } = useFocusBlur()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerOpen ? 1 : 0),
  }))

  const Icon = () => <Search size={12} />

  const onFocusChange = () => {
    onFocus()
    setSelectDrawerItem(type)
  }

  return (
    <TouchableOpacity
      ref={refTouchable}
      style={[
        styles.container,
        {
          borderLeftColor:
            focus || type === selectDrawerItem
              ? colors.white['0']
              : colors.black['1'],
        },
      ]}
      activeOpacity={1}
      onFocus={onFocusChange}
      onBlur={onBlur}
    >
      <SpacerX size={8} />

      <Icon />

      <SpacerX size={20} />

      <View>
        <Text size={focus ? 14 : 12}>{text}</Text>
      </View>
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
