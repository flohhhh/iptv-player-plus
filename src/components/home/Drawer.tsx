import { StyleSheet, useWindowDimensions, View } from 'react-native'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { colors } from '../../utils/colors'
import { DrawerItem } from './DrawerItem'
import { SpacerY } from '../spacer'

export const Drawer = () => {
  const { t } = useTranslation()
  const { height } = useWindowDimensions()

  return (
    <View style={[{ height }, styles.container]}>
      <DrawerItem text={t('common.movies')} type="movie" selected />
      <SpacerY size={10} />
      <DrawerItem text={t('common.series')} type="tvshow" />
      <SpacerY size={10} />
      <DrawerItem text={t('common.canal')} type="canal" />
      <SpacerY size={10} />
      <DrawerItem text={t('common.mylist')} type="mylist" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 80,
    paddingVertical: 16,
    backgroundColor: colors.black['1'],
    borderRadius: 4,
    alignItems: 'center',
  },
})
