import React, { useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import Text from '../text'
import { useTranslation } from 'react-i18next'
import { colors, getRandomFunColors } from '../../utils/colors'
import { SpacerY } from '../spacer'
import { uuid } from '../../utils/uuid'
import { useProfiles } from '../../atoms/profiles/profilesAtom'

interface INewProfile {
  onSaved: () => void
}
export const NewProfile: React.FC<INewProfile> = ({ onSaved }) => {
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
      onSaved()
    }
  }

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

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onSave}
        style={styles.save}
      >
        <Text size={12} color={colors.black['0']}>
          {t('common.button.save')}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  input: {},
  save: {
    backgroundColor: colors.white['0'],
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  error: { borderWidth: 1, borderColor: colors.fun.red, borderRadius: 2 },
})
