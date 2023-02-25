import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { SpacerY } from '../spacer'
import { useSelectedAccount } from '../../atoms/accounts/accountsAtom'
import { uuid } from '../../utils/uuid'

export const SelectAccount = () => {
  const refUsername = useRef<TextInput | null>(null)
  const refPassword = useRef<TextInput | null>(null)
  const { t } = useTranslation()

  const [_, setSelectedAccount] = useSelectedAccount()

  const [error, setError] = useState<string | null>(null)
  const [host, onChangeHost] = React.useState('http://')
  const [username, onChangeUsername] = React.useState('')
  const [password, onChangePassword] = React.useState('')

  const onSave = () => {
    if (host.length === 0 || username.length === 0 || password.length === 0) {
      setError(t('common.error.generic'))
    } else {
      setError(null)
      setSelectedAccount({
        id: uuid(),
        host,
        username,
        password,
      })
    }
  }

  return (
    <View>
      <Text size={22} font="CandyCake" style={{ alignSelf: 'center' }}>
        {t('accounts.title').toUpperCase()}
      </Text>
      <SpacerY size={14} />

      <TextInput
        style={[styles.input, error && host.length === 0 ? styles.error : {}]}
        placeholder={t('accounts.host') || ''}
        onChangeText={onChangeHost}
        value={host}
        autoFocus
        onSubmitEditing={() => {
          refUsername.current?.focus()
        }}
        blurOnSubmit={false}
      />
      <SpacerY size={12} />
      <TextInput
        ref={refUsername}
        style={[
          styles.input,
          error && username.length === 0 ? styles.error : {},
        ]}
        placeholder={t('accounts.username') || ''}
        onChangeText={onChangeUsername}
        value={username}
        onSubmitEditing={() => {
          refPassword.current?.focus()
        }}
        blurOnSubmit={false}
      />
      <SpacerY size={12} />
      <TextInput
        ref={refPassword}
        style={[
          styles.input,
          error && password.length === 0 ? styles.error : {},
        ]}
        placeholder={t('accounts.password') || ''}
        onChangeText={onChangePassword}
        value={password}
        secureTextEntry
      />

      <SpacerY size={8} />

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
  input: {
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.white['0'],
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignItems: 'center',
    width: 200,
  },
  save: {
    backgroundColor: colors.white['0'],
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
  },
  error: {
    borderWidth: 1,
    borderColor: colors.fun.red,
    borderRadius: 2,
  },
})
