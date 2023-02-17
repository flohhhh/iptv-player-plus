import React, { useEffect, useState } from 'react'
import {
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native'
import Video from 'react-native-video'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { IProgressVideo } from './types'
import { useSelectedAccount } from '../../atoms/accountsAtom'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { useTimeoutOpacity } from '../../hooks/useTimeoutOpacity'
import Animated from 'react-native-reanimated'
import { buildStreamUrl, TTypeUrl } from '../../atoms/api/utils'
import { useSelectDrawerItem } from '../../atoms/selectDrawerItemAtom'
import { TDrawerItemType } from '../home/DrawerItem'

const typeByDrawerItem: Record<TDrawerItemType, TTypeUrl> = {
  movie: 'movie',
  tvshow: 'series',
  canal: 'live',
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
    <Video
      style={{ width, height }}
      paused={paused}
      source={{
        // uri: buildStreamUrl(type, selectedAccount, selectedMediaId),
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
