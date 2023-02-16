import React, { useState } from 'react'
import {
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

  const animatedProps = useAnimatedProps(() => ({
    scale: `${scaleShared.value}`,
  }))

  const onFocusChange = () => {
    console.log('----focus')
    scaleShared.value = withTiming(1)
    onFocus()
  }

  const onBlurChange = () => {
    console.log('----blur')
    scaleShared.value = withTiming(1.2)
    onBlur()
  }

  if (!selectedAccount || !selectedMediaId) {
    return null
  }

  return (
    <View style={{ width, height }}>
      <ReanimatedTouchableOpacity
        style={[styles.back, opacityAnimated]}
        onPress={() => {
          setSelectedMedia(null)
        }}
        onFocus={onFocusChange}
        onBlur={onBlurChange}
      >
        <Back
          // animatedProps={animatedProps}
          size={50}
          color={colors.white['0']}
        />
      </ReanimatedTouchableOpacity>
      <Video
        style={{ width, height }}
        paused={true}
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

const styles = StyleSheet.create({
  back: {
    zIndex: 1,
    position: 'absolute',
    left: 10,
    top: 10,
  },
})

export default Player
