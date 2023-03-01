import { useWindowDimensions } from 'react-native'
import React from 'react'
import { Drawer } from './drawer/Drawer'
import { Streams } from './Streams'
import { useSelectedStream } from '../../atoms/streams/streamsAtoms'
import Player from '../player'
import LinearGradient from 'react-native-linear-gradient'
import { colors } from '../../utils/colors'

const Home = () => {
  const { width, height } = useWindowDimensions()
  const { stream } = useSelectedStream()

  if (stream) {
    return <Player />
  }

  return (
    <LinearGradient
      colors={[colors.black['0'], colors.black['2']]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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
