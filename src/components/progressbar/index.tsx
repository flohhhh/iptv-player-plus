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
} from 'react-native-reanimated'
import { colors } from '../../utils/colors'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import {
  FocusPressable,
  FocusPressableWithFocus,
} from '../focus-pressable/FocusPressable'

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
    progressWidth.value = progress * width
  }, [progress, progressWidth])

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: progressWidth.value,
      height: 6,
      borderRadius: 10,
    }
  })

  return (
    <FocusPressableWithFocus
      onPress={() => null}
      style={[style, styles.container, { backgroundColor }]}
    >
      {(focus) => (
        <Animated.View
          style={[
            progressStyle,
            {
              backgroundColor: focus ? colors.fun.pink : foregroundColor,
            },
          ]}
        />
      )}
    </FocusPressableWithFocus>
  )
}

export default DeterminateProgressBar

const styles = StyleSheet.create({
  container: {
    zIndex: 3,
    width: '100%',
    height: 4,
    borderRadius: 10,
    justifyContent: 'center',
  },
})
