import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated, { FadeIn } from 'react-native-reanimated'
import Text from '../text'
import { colors } from '../../utils/colors'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { ProfileLinearGradient } from './ProfileLinearGradient'
import { IProfile } from '../../atoms/profiles/types'

interface IProfileCard {
  profile: IProfile
  i: number
  onSelectProfile: (profile: IProfile) => () => void
  selectedProfileID?: string
}
export const ProfileCard: React.FC<IProfileCard> = ({
  profile,
  i,
  onSelectProfile,
  selectedProfileID,
}) => {
  const { onFocus, onBlur, focus } = useFocusBlur([profile.id])

  return (
    <Animated.View
      style={[
        styles.profile,
        {
          borderColor: focus ? colors.white['0'] : undefined,
        },
      ]}
      entering={FadeIn.duration(i * 500)}
    >
      <ProfileLinearGradient color={profile.color}>
        <TouchableOpacity
          activeOpacity={0.9}
          key={profile.id}
          onPress={onSelectProfile(profile)}
          style={styles.button}
          onFocus={onFocus}
          onBlur={onBlur}
          hasTVPreferredFocus={profile.id === selectedProfileID}
        >
          <Text size={focus ? 22 : 20} color={colors.black['0']}>
            {profile.name}
          </Text>
        </TouchableOpacity>
      </ProfileLinearGradient>
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
    borderRadius: 6,
    borderWidth: 2,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageProfiles: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
})
