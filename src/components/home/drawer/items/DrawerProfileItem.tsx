import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Text from '../../../text'
import { SpacerX } from '../../../spacer'
import { colors } from '../../../../utils/colors'
import { useFocusBlur } from '../../../../hooks/useFocusBlur'
import { ProfileLinearGradient } from '../../../profiles/ProfileLinearGradient'
import {
  useSelectedProfile,
  useSelectedProfileSet,
  useSelectedProfileValue,
} from '../../../../atoms/profiles/profilesAtom'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useDrawerOpen } from '../../../../atoms/drawerAtom'

interface IDrawerProfileItem {}
export const DrawerProfileItem: React.FC<IDrawerProfileItem> = ({}) => {
  const { drawerOpen } = useDrawerOpen()

  const profile = useSelectedProfileValue()
  const setProfile = useSelectedProfileSet()

  const { onFocus, onBlur, focus } = useFocusBlur()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerOpen ? 1 : 0),
  }))

  const onPressProfile = () => setProfile(null)

  if (!profile) {
    return null
  }

  return (
    <TouchableOpacity
      style={styles.selectedProfile}
      onFocus={onFocus}
      onBlur={onBlur}
      onPress={onPressProfile}
    >
      <SpacerX size={8} />
      <ProfileLinearGradient color={profile.color}>
        <View
          style={[
            styles.squareProfile,
            {
              borderWidth: focus ? 2 : 0,
              borderColor: focus ? colors.white['0'] : undefined,
            },
          ]}
        >
          <Text size={12} bold>
            {profile.name[0]}
          </Text>
        </View>
      </ProfileLinearGradient>
      <SpacerX size={8} />

      <Animated.View style={opacityAnimated}>
        <Text size={12} bold={focus}>
          {profile.name}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
  },
  selectedProfile: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareProfile: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
})
