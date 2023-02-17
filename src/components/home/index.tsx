import { useWindowDimensions } from 'react-native'
import React from 'react'
import { Drawer } from './Drawer'
import { Streams } from './Streams'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import Player from '../player'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../utils/colors'

const Home = () => {
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

      <Streams />
    </LinearGradient>
  )
}

export default Home
