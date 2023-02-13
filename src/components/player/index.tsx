import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import { VLCPlayer } from 'react-native-vlc-media-player'
import Text from '../text'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { Control } from './Control'

const Player = () => {
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()
  const { width, height } = useWindowDimensions()

  const [paused, setPaused] = useState(false)
  const onPlay = () => {
    setPaused(false)
  }

  const onPause = () => {
    setPaused(true)
  }

  return (
    <View style={{ width, height, backgroundColor: 'blue' }}>
      <TouchableOpacity onPress={() => setSelectedMedia(null)}>
        <Text size={12}>Back</Text>
      </TouchableOpacity>
      <VLCPlayer
        style={{ width, height }}
        paused={paused}
        videoAspectRatio="16:9"
        source={{
          uri: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        }}
      />
      <Control onPlay={onPlay} onPause={onPause} />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Player
