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

const Home = () => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  const { width, height } = useWindowDimensions()

  const [selectedMedia] = useSelectedMedia()

  if (selectedMedia) {
    return <Player />
  }

  return (
    <View
      style={{
        width,
        height,
        flexDirection: 'row',
      }}
    >
      <Drawer />

      <Content />
    </View>
  )
}

export default Home
