import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'

import { useTranslation } from 'react-i18next'
import {
  IProfile,
  useProfiles,
  useSelectedProfile,
} from '../../atoms/profilesAtom'
import Text from '../text'
import { colors } from '../../utils/colors'
import { SpacerX, SpacerY } from '../spacer'

const Profiles = () => {
  const [_, setSelectedProfile] = useSelectedProfile()
  const [profiles] = useProfiles()
  const { t } = useTranslation()
  const onSelectProfile = (p: IProfile) => () => {
    console.log('----p', p)
    setSelectedProfile(p)
  }

  const onManageProfiles = () => {}

  return (
    <View>
      <Text size={20}>{t('profiles.whos_watching')}</Text>

      <SpacerY size={10} />

      <View style={styles.containerProfiles}>
        {profiles.map((p, i) => (
          <>
            {i === 0 ? null : <SpacerX key={0} size={10} />}
            <TouchableOpacity
              onPress={onSelectProfile(p)}
              key={p.id}
              style={styles.profile}
            ></TouchableOpacity>
            {i === profiles.length - 1 ? null : (
              <SpacerX key={profiles.length - 1} size={10} />
            )}
          </>
        ))}
      </View>

      <SpacerY size={50} />

      <TouchableOpacity
        onPress={onManageProfiles}
        style={styles.manageProfiles}
      >
        <Text size={14}>{t('profiles.manage_profiles')}</Text>
      </TouchableOpacity>
    </View>
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

export default Profiles
