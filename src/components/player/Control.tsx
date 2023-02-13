import React from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import Text from '../text'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { SpacerX } from '../spacer'
import { colors } from '../../utils/colors'
import { Rewind } from '../../icons/Rewind'
import { Play } from '../../icons/Play'
import { Pause } from '../../icons/Pause'
import { Forward } from '../../icons/Forward'

interface IControl {
  onPlay: () => void
  onPause: () => void
  paused: boolean
}
export const Control: React.FC<IControl> = ({ onPlay, onPause, paused }) => {
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()
  const { width, height } = useWindowDimensions()

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.background} />
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={onPlay}
            style={styles.controlButton}
            activeOpacity={0.9}
          >
            <Rewind size={14} />
          </TouchableOpacity>

          <SpacerX size={20} />

          <TouchableOpacity
            onPress={paused ? onPlay : onPause}
            style={styles.controlButton}
            activeOpacity={0.9}
          >
            {paused ? <Play size={14} /> : <Pause size={14} />}
          </TouchableOpacity>

          <SpacerX size={20} />

          <TouchableOpacity
            onPress={onPlay}
            style={styles.controlButton}
            activeOpacity={0.9}
          >
            <Forward size={14} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    height: 240,
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
    width: 40,
    height: 40,
    borderRadius: 50,
  },
})
