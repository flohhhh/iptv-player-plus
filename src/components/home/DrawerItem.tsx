import {
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import React from 'react'
import { useSelectedProfile } from '../../atoms/profilesAtom'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { colors } from '../../utils/colors'

interface IDrawerItem {
  text: string
}
export const DrawerItem: React.FC<IDrawerItem> = ({ text }) => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()

  return (
    <View style={{ width: 40, height: 40 }}>
      <Text size={12}>{text}</Text>
    </View>
  )
}
