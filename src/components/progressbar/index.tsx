import React, { useEffect, useMemo } from 'react'
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  useWindowDimensions,
  View,
  ViewStyle,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { colors } from '../../utils/colors'

const { width } = Dimensions.get('screen')

const RIGHT_PROGRESS = 100

type DeterminateProgressBarProps = {
  color?: string
  style?: StyleProp<ViewStyle>
  progress: number
}
const DeterminateProgressBar = ({
  style,
  progress,
}: DeterminateProgressBarProps) => {
  const { width, height } = useWindowDimensions()

  const { backgroundColor, foregroundColor } = useMemo(() => {
    return {
      backgroundColor: colors.gray['0'],
      foregroundColor: colors.white['0'],
    }
  }, [])

  const progressWidth = useSharedValue(0)

  useEffect(() => {
    if (progress > 1 || progress < 0) {
      throw new Error('Invalid range (progress should be between 0 and 1')
    }
    // Animate progressWidth to the selected progress value
    progressWidth.value = progress * width - RIGHT_PROGRESS
  }, [progress, progressWidth])

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
      height: 6,
      borderRadius: 10,
    }
  })

  return (
    <View style={[style, styles.container, { backgroundColor }]}>
      <Animated.View
        style={[
          progressStyle,
          { backgroundColor: foregroundColor, justifyContent: 'center' },
        ]}
      />
    </View>
  )
}

export default DeterminateProgressBar

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    width: width - RIGHT_PROGRESS,
    height: 4,
    borderRadius: 10,
    justifyContent: 'center',
  },
})
