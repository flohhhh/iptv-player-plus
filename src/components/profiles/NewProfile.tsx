import React, { useEffect, useState } from 'react'
import {
  BackHandler,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Text from '../text'
import { useTranslation } from 'react-i18next'
import { colors, getRandomFunColors } from '../../utils/colors'
import { SpacerY } from '../spacer'
import { uuid } from '../../utils/uuid'
import { useProfiles } from '../../atoms/profiles/profilesAtom'
import { FocusPressableWithFocus } from '../focus-pressable/FocusPressable'

interface INewProfile {
  onClose: () => void
}
export const NewProfile: React.FC<INewProfile> = ({ onClose }) => {
  const { t } = useTranslation()
  const [profiles, setProfiles] = useProfiles()
  const [error, setError] = useState<string | null>(null)
  const [profileName, onChangeProfileName] = React.useState('')

  const onSave = () => {
    if (profileName.length === 0) {
      setError(t('common.error.generic'))
    } else {
      setError(null)
      setProfiles([
        ...profiles,
        { id: uuid(), color: getRandomFunColors(), name: profileName },
      ])
      onClose()
    }
  }

  const backAction = () => {
    onClose()
    return true
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )

    return () => {
      backHandler.remove()
    }
  }, [])

  return (
    <View>
      <Text size={30} font="CandyCake">
        {t('profiles.new_profile.title')}
      </Text>

      <SpacerY size={8} />

      <TextInput
        style={[
          styles.input,
          error && profileName.length === 0 ? styles.error : {},
        ]}
        placeholder={t('profiles.new_profile.profile_name') || ''}
        onChangeText={onChangeProfileName}
        placeholderTextColor={colors.white['0']}
        selectionColor={colors.white['0']}
        value={profileName}
        autoFocus
        blurOnSubmit={false}
      />

      {error && (
        <Text size={12} color={colors.fun.red}>
          {error}
        </Text>
      )}

      <SpacerY size={14} />

      <FocusPressableWithFocus onPress={onSave} style={styles.save}>
        {(focus) => (
          <Text size={focus ? 14 : 12} color={colors.black['0']}>
            {t('common.button.save')}
          </Text>
        )}
      </FocusPressableWithFocus>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  input: {
    backgroundColor: colors.black['0'],
    color: colors.white['0'],
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.white['0'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
  },
  save: {
    backgroundColor: colors.white['0'],
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  error: { borderWidth: 1, borderColor: colors.fun.red, borderRadius: 2 },
})
