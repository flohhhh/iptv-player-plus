import React, { useCallback, useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import { IProfile } from '../../atoms/profilesAtom'
import Text from '../text'
import { colors } from '../../utils/colors'
import profiles from './index'

interface IProfileCard {
  profile: IProfile
  i: number
  onSelectProfile: (profile: IProfile) => () => void
}
export const ProfileCard: React.FC<IProfileCard> = ({
  profile,
  i,
  onSelectProfile,
}) => {
  const [focus, setFocus] = useState(false)

  const onFocus = useCallback(() => {
    console.log('Focused item ', profile)
    setFocus(true)
  }, [profile.id])

  const onBlur = useCallback(() => {
    setFocus(false)
  }, [])

  return (
    <Animated.View
      style={[
        styles.profile,
        {
          backgroundColor: profile.color,
          borderColor: focus ? colors.white['0'] : undefined,
        },
      ]}
      entering={FadeIn.duration(i * 500)}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        key={profile.id}
        onPress={onSelectProfile(profile)}
        style={styles.button}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Text size={20}>{profile.name}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  containerProfiles: {
    flexDirection: 'row',
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: colors.white['0'],
    borderRadius: 10,
    borderWidth: 2,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageProfiles: {
    borderWidth: 1,
    // borderColor: colors.orange['0'],
    borderColor: 'red',
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
})
