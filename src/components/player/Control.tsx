import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelectedMedia } from '../../atoms/mediaAtom'
import { SpacerX, SpacerY } from '../spacer'
import { colors } from '../../utils/colors'
import { Play } from '../../icons/Play'
import { Pause } from '../../icons/Pause'
import ProgressBar from '../progressbar'
import Animated from 'react-native-reanimated'
import { useTimeoutOpacity } from '../../hooks/useTimeoutOpacity'
import { IControl } from './types'
import Text from '../text'
import { formatTime } from '../../utils/time'
import { Favorite } from '../../icons/Favorite'
import { FocusPressableIcon } from '../focus-pressable/FocusPressableIcon'
import { useTranslation } from 'react-i18next'
import { FocusPressable } from '../focus-pressable/FocusPressable'
import { FocusPressableText } from '../focus-pressable/FocusPressableText'

export const Control: React.FC<IControl> = ({
  onPlay,
  onPause,
  onForward,
  onRewind,
  onSelectAudioTrack,
  onSelectTextTrack,
  paused,
  progress,
  audioTracks,
  textTracks,
  selectedAudioTrack,
  selectedTextTrack,
  duration,
  currentTime,
}) => {
  const { t } = useTranslation()
  const [settingType, setSettingType] = useState<'audio' | 'subtitles' | null>(
    null
  )
  const { media, setMedia } = useSelectedMedia()
  const [lastEventType, setLastEventType] = React.useState('')

  const { opacityAnimated } = useTimeoutOpacity()

  const hasAddedToList = false

  const audios = ['Disable', 'French', 'English']
  const subtitles = ['Disable', 'Arabic', 'Spanish']

  const getSettingValues = () => {
    if (settingType === 'audio') return audios
    if (settingType === 'subtitles') {
      return subtitles
    }
    return []
  }
  return (
    <Animated.View style={[styles.container, opacityAnimated]}>
      <View style={styles.row}>
        <View style={styles.leftAndRight}>
          <Text size={12}>{formatTime(currentTime)}</Text>
          <FocusPressableIcon
            onPress={paused ? onPlay : onPause}
            Icon={paused ? Play : Pause}
            sizeIcon={14}
            color={colors.white['1']}
            focusColor={colors.white['0']}
          />
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
        </View>
        <View style={styles.leftAndRight}>
          <Text size={12}>{formatTime(duration - currentTime)}</Text>
          <FocusPressable
            onPress={paused ? onPlay : onPause}
            focusStyle={{ backgroundColor: 'red' }}
          >
            <Favorite
              size={24}
              borderColor={hasAddedToList ? colors.fun.red : colors.gray['0']}
              color={hasAddedToList ? colors.fun.red : colors.gray['1']}
            />
          </FocusPressable>
        </View>
      </View>

      <View style={styles.audioAndSubtitlesContainer}>
        <FocusPressableText
          text={t('streams.audio')}
          onPress={() => null}
          size={12}
          color={colors.white['0']}
          focusColorText={colors.black['0']}
          style={styles.audioSubButton}
          focusStyle={{ backgroundColor: colors.white['0'] }}
          onFocus={() => setSettingType('audio')}
          // onBlur={() => setSettingType(null)}
        />

        <SpacerX size={6} />

        <FocusPressableText
          text={t('streams.subtitles')}
          onPress={() => null}
          size={12}
          color={colors.white['0']}
          focusColorText={colors.black['0']}
          style={styles.audioSubButton}
          focusStyle={{ backgroundColor: colors.white['0'] }}
          onFocus={() => setSettingType('subtitles')}
          // onBlur={() => setSettingType(null)}
        />
      </View>

      {settingType && (
        <>
          <SpacerY size={4} />
          <View style={styles.audioAndSubtitlesContainer}>
            {getSettingValues().map((v, i, arr) => (
              <>
                <FocusPressableText
                  text={v}
                  onPress={() => {
                    console.log('----v', v)
                    setSettingType(null)
                  }}
                  size={12}
                  color={colors.white['0']}
                  focusColorText={colors.black['0']}
                  style={styles.audioSubButton}
                  focusStyle={{ backgroundColor: colors.white['0'] }}
                />
                {i !== arr.length - 1 && <SpacerX size={4} />}
              </>
            ))}
          </View>
        </>
      )}
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  leftAndRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  progressContainer: {
    flexGrow: 6,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  audioAndSubtitlesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  audioSubButton: {
    borderRadius: 4,
    borderColor: colors.gray['0'],
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: colors.black['0'],
  },
  row: { flexDirection: 'row' },
})
