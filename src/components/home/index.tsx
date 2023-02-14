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
import { Drawer } from './Drawer'
import { Content } from './Content'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import Player from '../player'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../utils/colors'

const Home = () => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()

  const [selectedMedia] = useSelectedMedia()

  if (selectedMedia) {
    return <Player />
  }

  return (
    <LinearGradient
      colors={[colors.black['0'], colors.black['1']]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
      style={{
        width,
        height,
        flexDirection: 'row',
      }}
    >
      <Drawer />

      <Content />
    </LinearGradient>
  )
}

export default Home
