import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import {
  useSelectedStream,
  useStreamsToList,
} from '../../atoms/streams/streamsAtoms'
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
import { useTranslation } from 'react-i18next'
import { FocusPressableWithFocus } from '../focus-pressable/FocusPressable'
import { FocusPressableText } from '../focus-pressable/FocusPressableText'
import { useSelectedAccount } from '../../atoms/accounts/accountsAtom'

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
  elapsedTime,
  loading,
}) => {
  const { t } = useTranslation()
  const { account } = useSelectedAccount()
  const { streamsToList, setStreamsToList } = useStreamsToList()
  const { stream, setStream } = useSelectedStream()

  const [settingType, setSettingType] = useState<'audio' | 'subtitles' | null>(
    null
  )

  const { opacityAnimated } = useTimeoutOpacity()

  if (!account || !stream) {
    return null
  }

  // const hasAddedToList = streamsToList[account.id][stream.type].some(
  //   (s) => s.category_id === stream?.id
  // )

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

  const onAddToList = () => {
    // if (stream) {
    //   if (streamsToList.some((v) => v.id === stream.id)) {
    //     setStreamsToList(streamsToList.filter((v) => v.id !== stream.id))
    //   } else {
    //     setStreamsToList([...streamsToList, stream])
    //   }
    // }
  }

  return (
    <Animated.View style={[styles.container, opacityAnimated]}>
      <View style={styles.row}>
        <View style={styles.leftAndRight}>
          {!loading && <Text size={12}>{formatTime(currentTime)}</Text>}

          {loading ? (
            <ActivityIndicator size="small" color={colors.white['0']} />
          ) : paused ? (
            <FocusPressableWithFocus onPress={onPlay}>
              {(focus) => (
                <Play size={14} color={colors.white[focus ? '0' : '1']} />
              )}
            </FocusPressableWithFocus>
          ) : (
            <FocusPressableWithFocus onPress={onPause}>
              {(focus) => (
                <Pause size={14} color={colors.white[focus ? '0' : '1']} />
              )}
            </FocusPressableWithFocus>
          )}
        </View>
        <View style={styles.progressContainer}>
          <ProgressBar progress={progress} />
        </View>

        <View style={styles.leftAndRight}>
          {!loading && <Text size={12}>{formatTime(elapsedTime)}</Text>}
          <FocusPressableWithFocus onPress={paused ? onPlay : onPause}>
            {(focus) => (
              <Favorite
                size={24}
                borderColor={
                  hasAddedToList || focus
                    ? colors.fun.pinkSecondary
                    : colors.gray['0']
                }
                color={
                  hasAddedToList || focus
                    ? colors.fun.pinkSecondary
                    : colors.gray['1']
                }
              />
            )}
          </FocusPressableWithFocus>
        </View>
      </View>

      {!loading && (
        <View style={styles.audioAndSubtitlesContainer}>
          <FocusPressableText
            text={t('streams.audio')}
            onPress={onAddToList}
            size={12}
            color={colors.white['0']}
            focusColorText={colors.black['0']}
            style={styles.audioSubButton}
            focusStyle={{ backgroundColor: colors.white['0'] }}
            onFocus={() => setSettingType('audio')}
            forceFocusStyle={settingType === 'audio'}
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
            forceFocusStyle={settingType === 'subtitles'}
            // onBlur={() => setSettingType(null)}
          />
        </View>
      )}

      {settingType && (
        <>
          <SpacerY size={4} />
          <View style={styles.audioAndSubtitlesContainer}>
            {getSettingValues().map((v, i, arr) => (
              <React.Fragment key={v}>
                <FocusPressableText
                  text={v}
                  onPress={() => {
                    setSettingType(null)
                  }}
                  size={12}
                  color={colors.white['0']}
                  focusColorText={colors.black['0']}
                  style={styles.audioSubButton}
                  focusStyle={{ backgroundColor: colors.white['0'] }}
                />
                {i !== arr.length - 1 && <SpacerX size={4} />}
              </React.Fragment>
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
    height: 80,
  },
  leftAndRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 6,
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
