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

interface IControl {
  onPlay: () => void
  onPause: () => void
}
export const Control: React.FC<IControl> = ({ onPlay, onPause }) => {
  const [selectedMedia, setSelectedMedia] = useSelectedMedia()
  const { width, height } = useWindowDimensions()

  return (
    <View
      style={{
        flexDirection: 'row',
        position: 'absolute',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        bottom: 10,
        left: 10,
        right: 10,
        backgroundColor: 'red',
      }}
    >
      <TouchableOpacity
        onPress={onPlay}
        style={{ width: 40, height: 40, backgroundColor: 'black' }}
      >
        <Text size={12}>Play</Text>
      </TouchableOpacity>

      <SpacerX size={20} />

      <TouchableOpacity
        onPress={onPause}
        style={{ width: 40, height: 40, backgroundColor: 'black' }}
      >
        <Text size={12}>Pause</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  vlc: {
    flex: 1,
    width: 500,
    height: 500,
  },
})
