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
import { IProgressVideo } from './types'
import { useSelectedAccount } from '../../atoms/accounts/accountsAtom'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { useTimeoutOpacity } from '../../hooks/useTimeoutOpacity'
import Animated from 'react-native-reanimated'
import { buildStreamUrl, TTypeUrl } from '../../atoms/api/utils'
import { useSelectDrawerItem } from '../../atoms/selectDrawerItemAtom'
import { TDrawerItemType } from '../home/DrawerItem'
import { colors } from '../../utils/colors'
import { Back } from '../../icons/Back'
import { Control } from './Control'

const typeByDrawerItem: Record<TDrawerItemType, TTypeUrl> = {
  movie: 'movie',
  tvshow: 'series',
  canal: 'live',
  mylist: 'movie',
}
const ReanimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Player = () => {
  const [selectedMediaId, setSelectedMedia] = useSelectedMedia()
  const [selectedAccount] = useSelectedAccount()
  const { width, height } = useWindowDimensions()
  const { opacityAnimated } = useTimeoutOpacity()
  const { onFocus, onBlur, focus } = useFocusBlur()
  const [selectedDrawerItem] = useSelectDrawerItem()

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

  if (!selectedAccount || !selectedMediaId || !selectedDrawerItem) {
    return null
  }

  const type = selectedDrawerItem
    ? typeByDrawerItem[selectedDrawerItem]
    : 'movie'

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
        paused={paused}
        source={{
          uri: buildStreamUrl(type, selectedAccount, selectedMediaId),
        }}
        onProgress={onProgress}
        bufferConfig={{
          minBufferMs: 150000,
          maxBufferMs: 500000,
          bufferForPlaybackMs: 25000,
          bufferForPlaybackAfterRebufferMs: 50000,
        }}
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
