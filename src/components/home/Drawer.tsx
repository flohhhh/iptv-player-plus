import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import React from 'react'
import { useSelectedProfile } from '../../atoms/profilesAtom'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { colors } from '../../utils/colors'
import { DrawerItem } from './DrawerItem'

export const Drawer = () => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()

  return (
    <View style={[{ height }, styles.container]}>
      <DrawerItem text={t('common.movies')} />
      <DrawerItem text={t('common.series')} />
      <DrawerItem text={t('common.canal')} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    backgroundColor: colors.black['1'],
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
