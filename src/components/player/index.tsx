import React, { useState } from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import Video from 'react-native-video'
import Text from '../text'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { Control } from './Control'
import { IProgressVideo } from './types'

const Player = () => {
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()
  const { width, height } = useWindowDimensions()

  const [progress, setProgress] = useState(0)

  const [paused, setPaused] = useState(false)
  const onPlay = () => {
    setPaused(false)
  }

  const onPause = () => {
    setPaused(true)
  }

  const onProgress = (e: IProgressVideo) => {
    const duration = e.playableDuration
    const currentTime = e.currentTime

    if (currentTime > 0 && currentTime <= duration) {
      setProgress((currentTime * duration) / 100)
    }
  }

  return (
    <View style={{ width, height }}>
      <TouchableOpacity onPress={() => setSelectedMedia(null)}>
        <Text size={12}>Back</Text>
      </TouchableOpacity>
      <Video
        style={{ width, height }}
        paused={paused}
        source={{
          uri: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4',
        }}
        onProgress={onProgress}
      />
      <Control
        onPlay={onPlay}
        onPause={onPause}
        paused={paused}
        progress={progress}
        // duration={duration}
      />
    </View>
  )
}

const styles = StyleSheet.create({})

export default Player
