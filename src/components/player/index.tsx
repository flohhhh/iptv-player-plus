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
import { buildMovieUrl } from '../../atoms/api/utils'
import { useSelectedAccount } from '../../atoms/accountsAtom'

const Player = () => {
  const [selectedMediaId, setSelectedMedia] = useSelectedMedia()
  const [selectedAccount] = useSelectedAccount()
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

  if (!selectedAccount || !selectedMediaId) {
    return null
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
          uri: buildMovieUrl(selectedAccount, selectedMediaId),
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
