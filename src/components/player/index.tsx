import React, { useEffect, useRef, useState } from 'react'
import {
  BackHandler,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import Video, { OnLoadData } from 'react-native-video'
import {
  useSelectedStream,
  useStreamsToList,
} from '../../atoms/streams/streamsAtoms'
import { IAudioTrack, IProgressVideo, ITextTrack } from './types'
import { useSelectedAccount } from '../../atoms/accounts/accountsAtom'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { useTimeoutOpacity } from '../../hooks/useTimeoutOpacity'
import Animated from 'react-native-reanimated'
import { useSelectDrawerItem } from '../../atoms/selectDrawerItemAtom'
import { colors } from '../../utils/colors'
import { Back } from '../../icons/Back'
import { Control } from './Control'
import Text from '../text'
import { bufferConfig } from './config'
import { useStreamsToContinue } from '../../atoms/streams/streamsAtoms'
import { IStream } from '../../atoms/streams/types'

const ReanimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity)

const Player = () => {
  const videoRef = useRef<Video | null>(null)
  const { stream, setStream } = useSelectedStream()
  const { account } = useSelectedAccount()
  const { width, height } = useWindowDimensions()
  const { opacityAnimated } = useTimeoutOpacity()
  const { onFocus, onBlur, focus } = useFocusBlur()
  const { selectDrawerItem } = useSelectDrawerItem()
  const { streamsToContinue, setStreamsToContinue } = useStreamsToContinue()

  const [duration, setDuration] = useState(-1)
  const [currentTime, setCurrentTime] = useState(-1)
  const [progress, setProgress] = useState(0)
  const [elapsedTime, setElapsedTime] = useState(0)

  const [audioTracks, setAudioTracks] = useState<IAudioTrack[] | undefined>(
    undefined
  )
  const [textTracks, setTextTracks] = useState<ITextTrack[] | undefined>(
    undefined
  )
  const [selectedAudioTrack, setSelectedAudioTrack] = useState(undefined)
  const [selectedTextTrack, setSelectedTextTrack] = useState(undefined)

  const [paused, setPaused] = useState(false)
  const [hasFinished, setHasFinished] = useState(false)

  const title = 'Seven'
  const onPlay = () => {
    setPaused(false)
  }

  const onPause = () => {
    setPaused(true)
  }

  const onLoad = (onLoadData: OnLoadData) => {
    console.log('----on load', onLoadData)
    setDuration(onLoadData.duration)
    setAudioTracks(onLoadData.audioTracks)
    setTextTracks(onLoadData.textTracks)
  }

  const onProgress = (e: IProgressVideo) => {
    setCurrentTime(e.currentTime)

    if (e.currentTime > 0 && duration > 0) {
      const elapsedTime = duration - e.currentTime
      setElapsedTime(elapsedTime)
      const progressValue = e.currentTime / duration
      setProgress(progressValue)

      if (e.currentTime > duration - 180) {
        setHasFinished(true)
      }
    }
  }

  const onFocusChange = () => onFocus()
  const onBlurChange = () => onBlur()
  const backAction = () => {
    setPaused(true)
    setStream(null)
    return true
  }

  const onForward = () => {
    videoRef.current?.seek(currentTime + 30)
  }

  const onRewind = () => {
    videoRef.current?.seek(currentTime - 15)
  }

  const onSelectAudioTrack = () => {}
  const onSelectTextTrack = () => {}

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => {
      backHandler.remove()
      if (stream) {
        if (!streamsToContinue.some((s) => s.id === stream.id)) {
          setStreamsToContinue([
            ...streamsToContinue,
            {
              ...stream,
              resumeAt: currentTime,
              lastAudioTrackSelected: selectedAudioTrack,
              lastSubtitleTrackSelected: selectedTextTrack,
            },
          ])
        }
      }
    }
  }, [])

  useEffect(() => {
    if (hasFinished) {
      setStreamsToContinue(streamsToContinue.filter((s) => s.id !== stream?.id))
    }
  }, [hasFinished])

  return (
    <>
      <View style={{ width, height }}>
        <Animated.View style={[styles.title, opacityAnimated]}>
          <Text size={16}>{title}</Text>
        </Animated.View>
        <ReanimatedTouchableOpacity
          style={[styles.back, opacityAnimated]}
          onPress={() => {
            setStream(null)
          }}
          onFocus={onFocusChange}
          onBlur={onBlurChange}
        >
          <Back
            // animatedProps={animatedProps}
            size={30}
            color={colors.white['0']}
          />
        </ReanimatedTouchableOpacity>

        <Video
          ref={videoRef}
          style={{ width, height }}
          paused={true}
          source={{
            uri: 'https://filesamples.com/samples/video/mkv/sample_1280x720_surfing_with_audio.mkv', //media.url,
          }}
          currentTime={currentTime}
          onLoad={onLoad}
          fullscreen={false}
          onProgress={onProgress}
          bufferConfig={bufferConfig}
          // selectedAudioTrack={selectedAudioTrack}
          // selectedTextTrack={selectedTextTrack}
        />
        <Control
          onPlay={onPlay}
          onPause={onPause}
          onForward={onForward}
          onRewind={onRewind}
          onSelectAudioTrack={onSelectAudioTrack}
          onSelectTextTrack={onSelectTextTrack}
          paused={paused}
          audioTracks={audioTracks}
          textTracks={textTracks}
          selectedAudioTrack={selectedAudioTrack}
          selectedTextTrack={selectedTextTrack}
          duration={duration}
          currentTime={currentTime}
          elapsedTime={elapsedTime}
          progress={progress}
        />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  back: {
    zIndex: 1,
    position: 'absolute',
    left: 10,
    top: 10,
  },
  title: {
    zIndex: 1,
    position: 'absolute',
    right: 20,
    top: 10,
  },
})

export default Player
