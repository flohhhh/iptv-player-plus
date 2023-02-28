import React, { useRef, useState } from 'react'
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import { colors } from '../../utils/colors'
import { useTranslation } from 'react-i18next'
import Text from '../text'
import { SpacerY } from '../spacer'
import { useSelectedAccount } from '../../atoms/accounts/accountsAtom'
import { uuid } from '../../utils/uuid'
import { useAccountInfo } from '../../atoms/api/account'
import { IAccountInfo } from '../../atoms/api/types'
import {
  FocusPressable,
  FocusPressableWithFocus,
} from '../focus-pressable/FocusPressable'

export const SelectAccount = () => {
  const refHost = useRef<TextInput | null>(null)
  const refUsername = useRef<TextInput | null>(null)
  const refPassword = useRef<TextInput | null>(null)
  const { t } = useTranslation()

  const { setAccount } = useSelectedAccount()

  const [error, setError] = useState<string | null>(null)
  const [host, onChangeHost] = React.useState('http://')
  const [username, onChangeUsername] = React.useState('')
  const [password, onChangePassword] = React.useState('')

  const { fetch } = useAccountInfo()

  const onSave = async () => {
    if (host.length === 0 || username.length === 0 || password.length === 0) {
      setError(t('common.error.generic'))
    } else {
      const resp = await fetch({
        id: '',
        host,
        username,
        password,
      })
      if (resp.status > 400) {
        setError(
          t(`common.error.${resp.status === 401 ? 'unauthorized' : 'generic'}`)
        )
      } else {
        const info = (await resp.json()) as IAccountInfo
        setError(null)
        setAccount({
          id: uuid(),
          host,
          username,
          password,
          info,
        })
      }
    }
  }

  return (
    <View>
      <Text size={22} font="CandyCake" style={{ alignSelf: 'center' }}>
        {t('accounts.title')}
      </Text>
      <SpacerY size={14} />

      <FocusPressable
        onPress={() => null}
        onFocus={() => {
          refHost.current?.focus()
        }}
      >
        <TextInput
          ref={refHost}
          style={[styles.input, error && host.length === 0 ? styles.error : {}]}
          placeholder={t('accounts.host') || ''}
          onChangeText={onChangeHost}
          value={host}
          autoFocus
          selectionColor={colors.white['0']}
          placeholderTextColor={colors.white['0']}
          onSubmitEditing={() => {
            refUsername.current?.focus()
          }}
          blurOnSubmit={false}
        />
      </FocusPressable>

      <SpacerY size={12} />

      <FocusPressable
        onPress={() => null}
        onFocus={() => {
          refUsername.current?.focus()
        }}
      >
        <TextInput
          ref={refUsername}
          style={[
            styles.input,
            error && username.length === 0 ? styles.error : {},
          ]}
          placeholder={t('accounts.username') || ''}
          placeholderTextColor={colors.white['0']}
          onChangeText={onChangeUsername}
          value={username}
          onSubmitEditing={() => {
            refPassword.current?.focus()
          }}
          blurOnSubmit={false}
        />
      </FocusPressable>

      <SpacerY size={12} />

      <FocusPressable
        onPress={() => null}
        onFocus={() => {
          refPassword.current?.focus()
        }}
      >
        <TextInput
          ref={refPassword}
          style={[
            styles.input,
            error && password.length === 0 ? styles.error : {},
          ]}
          placeholder={t('accounts.password') || ''}
          placeholderTextColor={colors.white['0']}
          onChangeText={onChangePassword}
          value={password}
          secureTextEntry
        />
      </FocusPressable>

      <SpacerY size={8} />

      {error && (
        <Text size={12} color={colors.fun.red}>
          {error}
        </Text>
      )}

      <SpacerY size={14} />

      <FocusPressableWithFocus onPress={onSave}>
        {(focus) => (
          <View
            style={[
              styles.save,
              { backgroundColor: colors.white[focus ? '0' : '1'] },
            ]}
          >
            <Text size={focus ? 14 : 12} color={colors.black['0']}>
              {t('common.button.save')}
            </Text>
          </View>
        )}
      </FocusPressableWithFocus>
    </View>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.black['0'],
    color: colors.white['0'],
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
