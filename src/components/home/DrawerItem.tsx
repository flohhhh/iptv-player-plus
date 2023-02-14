import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { TvShow } from '../../icons/TvShow'
import { SpacerX } from '../spacer'
import { Canal } from '../../icons/Canal'
import { MyList } from '../../icons/MyList'
import { Movie } from '../../icons/Movie'
import { colors } from '../../utils/colors'
import { Search } from '../../icons/Search'

type TType = 'movie' | 'tvshow' | 'canal' | 'mylist'
interface IDrawerItem {
  text: string
  type: TType
  selected?: boolean
}

const DEFAULT_SIZE = 14

const iconByType: Record<TType, () => JSX.Element> = {
  movie: () => <Movie size={DEFAULT_SIZE} color="white" />,
  tvshow: () => <TvShow size={DEFAULT_SIZE} color="white" />,
  canal: () => <Canal size={DEFAULT_SIZE} color="white" />,
  mylist: () => <MyList size={DEFAULT_SIZE} color="white" />,
}

export const DrawerItem: React.FC<IDrawerItem> = ({ text, type, selected }) => {
  const { t } = useTranslation()

  const Icon = iconByType[type]

  return (
    <View
      style={[
        styles.container,
        selected ? { borderLeftColor: colors.white['0'] } : {},
      ]}
    >
      <SpacerX size={8} />
      <Icon />
      <SpacerX size={10} />
      <Text size={12}>{text}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
  },
})
