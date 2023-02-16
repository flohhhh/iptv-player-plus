import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { TvShow } from '../../icons/TvShow'
import { SpacerX } from '../spacer'
import { Canal } from '../../icons/Canal'
import { MyList } from '../../icons/MyList'
import { Movie } from '../../icons/Movie'
import { colors } from '../../utils/colors'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useFocusBlur } from '../../hooks/useFocusBlur'

type TType = 'movie' | 'tvshow' | 'canal' | 'mylist'
interface IDrawerItem {
  text: string
  type: TType
  drawerIsOpen: boolean
}

const DEFAULT_SIZE = 14

const iconByType: Record<TType, (selected: boolean) => () => JSX.Element> = {
  movie: (s) => () =>
    <Movie size={s ? DEFAULT_SIZE : DEFAULT_SIZE} color="white" />,
  tvshow: (s) => () =>
    <TvShow size={s ? DEFAULT_SIZE : DEFAULT_SIZE} color="white" />,
  canal: (s) => () =>
    <Canal size={s ? DEFAULT_SIZE : DEFAULT_SIZE} color="white" />,
  mylist: (s) => () =>
    <MyList size={s ? DEFAULT_SIZE : DEFAULT_SIZE} color="white" />,
}

export const DrawerItem: React.FC<IDrawerItem> = ({
  text,
  type,
  drawerIsOpen = false,
}) => {
  const { t } = useTranslation()

  const { onFocus, onBlur, focus } = useFocusBlur()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerIsOpen ? 1 : 0),
  }))

  const Icon = iconByType[type](focus)

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderLeftColor: focus ? colors.white['0'] : colors.black['1'] },
      ]}
      activeOpacity={1}
      onFocus={onFocus}
      onBlur={onBlur}
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
