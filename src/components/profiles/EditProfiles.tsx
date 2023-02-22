import React, { useState } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Text from '../text'
import { colors } from '../../utils/colors'
import Animated, { FadeIn } from 'react-native-reanimated'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { useTranslation } from 'react-i18next'

interface IEditProfilesButton {
  onEditProfilesButton: () => void
}
export const EditProfilesButton: React.FC<IEditProfilesButton> = ({
  onEditProfilesButton,
}) => {
  const { t } = useTranslation()
  const { onFocus, onBlur, focus } = useFocusBlur()

  return (
    <Animated.View
      style={[
        styles.manageProfiles,
        {
          borderColor: focus ? colors.white['0'] : colors.fun.red,
        },
      ]}
      entering={FadeIn.duration(4 * 500)}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onEditProfilesButton}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Text size={focus ? 14 : 12}>{t('profiles.edit_profiles')}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageProfiles: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
})
