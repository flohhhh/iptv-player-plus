import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { SpacerX } from '../spacer'
import { colors } from '../../utils/colors'
import { Rewind } from '../../icons/Rewind'
import { Play } from '../../icons/Play'
import { Pause } from '../../icons/Pause'
import { Forward } from '../../icons/Forward'
import ProgressBar from '../progressbar'
import Animated from 'react-native-reanimated'
import { useTimeoutOpacity } from '../../hooks/useTimeoutOpacity'

interface IControl {
  onPlay: () => void
  onPause: () => void
  paused: boolean
  progress: number
}
export const Control: React.FC<IControl> = ({
  onPlay,
  onPause,
  paused,
  progress,
}) => {
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()
  const [lastEventType, setLastEventType] = React.useState('')

  const { opacityAnimated } = useTimeoutOpacity()

  return (
    <Animated.View style={[styles.container, opacityAnimated]}>
      <View style={styles.card}>
        <View style={styles.background} />

        <View>
          <ProgressBar progress={progress} style={styles.progressbar} />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={onPlay}
            style={styles.controlButton}
            activeOpacity={0.9}
          >
            <Rewind size={10} />
          </TouchableOpacity>

          <SpacerX size={20} />

          <TouchableOpacity
            onPress={paused ? onPlay : onPause}
            style={styles.controlButton}
            activeOpacity={0.9}
          >
            {paused ? <Play size={10} /> : <Pause size={10} />}
          </TouchableOpacity>

          <SpacerX size={20} />

          <TouchableOpacity
            onPress={onPlay}
            style={styles.controlButton}
            activeOpacity={0.9}
          >
            <Forward size={10} />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  background: {
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black['0'],
    opacity: 0.2,
  },
  card: {
    height: 180,
  },
  buttons: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  controlButton: {
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white['0'],
    width: 30,
    height: 30,
    borderRadius: 50,
  },
  progressbar: { marginTop: 10, marginLeft: 14, marginRight: 100 },
})
