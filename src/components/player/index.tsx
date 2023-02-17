import React, { useEffect, useState } from 'react'
import {
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import Video from 'react-native-video'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { Control } from './Control'
import { IProgressVideo } from './types'
import { buildMovieUrl } from '../../atoms/api/utils'
import { useSelectedAccount } from '../../atoms/accountsAtom'
import { Back } from '../../icons/Back'
import { colors } from '../../utils/colors'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { useTimeoutOpacity } from '../../hooks/useTimeoutOpacity'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

const ReanimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Player = () => {
  const [selectedMediaId, setSelectedMedia] = useSelectedMedia()
  const [selectedAccount] = useSelectedAccount()
  const { width, height } = useWindowDimensions()
  const { opacityAnimated } = useTimeoutOpacity()
  const { onFocus, onBlur, focus } = useFocusBlur()

  const scaleShared = useSharedValue<number | undefined>(undefined)

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

  const onFocusChange = () => {
    onFocus()
  }

  const onBlurChange = () => {
    onBlur()
  }
  const backAction = () => {
    setSelectedMedia(null)
    setPaused(true)
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => backHandler.remove()
  }, [])

  if (!selectedAccount || !selectedMediaId) {
    return null
  }

  return (
    <Video
      style={{ width, height }}
      paused={paused}
      source={{
        uri: 'http://mol-2.com:80/movie/sc68Kfd0em3tNKK/asm7VUX0zA0y7Y8/479231.mkv',
      }}
      onProgress={onProgress}
      bufferConfig={{
        minBufferMs: 150000,
        maxBufferMs: 500000,
        bufferForPlaybackMs: 25000,
        bufferForPlaybackAfterRebufferMs: 50000,
      }}
    />
  )
}

const styles = StyleSheet.create({
  back: {
    zIndex: 1,
    position: 'absolute',
    left: 10,
    top: 10,
  },
})

export default Player
