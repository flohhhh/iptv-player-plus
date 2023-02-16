import { useEffect } from 'react'
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { useTVEventHandler } from 'react-native'

export const useTimeoutOpacity = () => {
  const showStreamControl = useSharedValue<boolean>(true)

  const myTVEventHandler = () => {
    showStreamControl.value = true
  }

  useTVEventHandler(myTVEventHandler)

  useEffect(() => {
    setTimeout(() => {
      showStreamControl.value = false
    }, 3000)
  }, [showStreamControl.value])

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(showStreamControl.value ? 1 : 0),
  }))
  return { opacityAnimated }
}
